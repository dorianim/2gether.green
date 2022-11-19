use crate::interhyp;
use crate::model::{self};
use ::serde::{Deserialize, Serialize};
use rocket::http::Status;
use rocket::serde::json::Json;
use rocket::*;
use sea_orm::strum::Display;
use sea_orm::ActiveValue::Set;
use sea_orm::{DatabaseConnection, EntityTrait};
use uuid::Uuid;

#[derive(Serialize)]
struct MorgageRateResponse {
    cost_per_month: f32,
    payoff_time: u16,
    bank_name: String,
}

#[derive(Deserialize)]
struct ProjectCreationRequest {
    zip_code: u32,
    project_type: ProjectType,
}

#[derive(Display, Deserialize)]
enum ProjectType {
    Wind,
    Solar,
    Hydro,
}

#[derive(Display, Deserialize)]
enum ProjectStatus {
    WaitingForApproval,
    Approved,
    Rejected,
    Funding,
    Finished,
}

#[derive(Deserialize)]
struct ProjectReviewApproved {
    revenue_per_month: i32,
    construction_time: i32,
    total_cost: i32,
}

#[derive(Deserialize)]
struct ProjectFundingStarted {
    amortisation: u8,
}

#[derive(Deserialize)]
#[serde(tag = "status")]
enum ProjectStatusUpdateRequest {
    Approved(ProjectReviewApproved),
    Rejected,
    Funding(ProjectFundingStarted),
}

#[get("/")]
async fn get_all_projects(
    db: &State<DatabaseConnection>,
) -> Result<Json<Vec<model::project::Model>>, Status> {
    let db = db as &DatabaseConnection;
    let projects = model::project::Entity::find().all(db).await.unwrap();
    Ok(Json(projects))
}

#[get("/<project_id>")]
async fn get_project(
    project_id: String,
    db: &State<DatabaseConnection>,
) -> Result<Json<model::project::Model>, Status> {
    let db = db as &DatabaseConnection;
    let project = model::project::Entity::find_by_id(project_id.to_owned())
        .one(db)
        .await
        .unwrap();

    if project.is_none() {
        return Err(Status::NotFound);
    }
    Ok(Json(project.unwrap()))
}

#[post("/", data = "<project_creation_request>")]
async fn create_project(
    project_creation_request: Json<ProjectCreationRequest>,
    db: &State<DatabaseConnection>,
) -> Result<Json<model::project::Model>, Status> {
    let db = db as &DatabaseConnection;
    let new_project = model::project::ActiveModel {
        id: Set(Uuid::new_v4().to_string()),
        zip_code: Set(project_creation_request.zip_code as i32),
        status: Set(ProjectStatus::WaitingForApproval.to_string()),
        project_type: Set(project_creation_request.project_type.to_string()),
        cost_per_month: Set(None),
        construction_time: Set(None),
        payoff_time: Set(None),
        revenue_per_month: Set(None),
        total_cost: Set(None),
    };
    model::project::Entity::insert(new_project.to_owned())
        .exec(db)
        .await
        .unwrap();

    Ok(Json(new_project.try_into().unwrap()))
}

#[patch("/<project_id>", data = "<project_update_request>")]
async fn update_project_status(
    project_id: String,
    project_update_request: Json<ProjectStatusUpdateRequest>,
    db: &State<DatabaseConnection>,
) -> Result<Status, Status> {
    let project = get_project_by_id(db, &project_id).await?;

    let updated_model = match project_update_request.0 {
        ProjectStatusUpdateRequest::Approved(data) => {
            if project.status != ProjectStatus::WaitingForApproval.to_string()
                || data.total_cost <= 30000
            {
                return Err(Status::NotAcceptable);
            }

            model::project::ActiveModel {
                id: Set(project_id),
                status: Set(ProjectStatus::Approved.to_string()),
                construction_time: Set(Some(data.construction_time)),
                revenue_per_month: Set(Some(data.revenue_per_month)),
                total_cost: Set(Some(data.total_cost)),
                ..Default::default()
            }
        }
        ProjectStatusUpdateRequest::Rejected => {
            if project.status != ProjectStatus::WaitingForApproval.to_string() {
                return Err(Status::NotAcceptable);
            }

            model::project::ActiveModel {
                id: Set(project_id),
                status: Set(ProjectStatus::Rejected.to_string()),
                ..Default::default()
            }
        }
        ProjectStatusUpdateRequest::Funding(data) => {
            if project.status != ProjectStatus::Approved.to_string() {
                return Err(Status::NotAcceptable);
            }

            let morgage_rate =
                get_morgage_offer(project_id.to_owned(), data.amortisation, db).await?;
            model::project::ActiveModel {
                id: Set(project_id),
                status: Set(ProjectStatus::Funding.to_string()),
                cost_per_month: Set(Some(morgage_rate.monthlyPayment as i32)),
                payoff_time: Set(Some(morgage_rate.totalLoanDurationMonths as i32)),
                ..Default::default()
            }
        }
    };
    let db = db as &DatabaseConnection;
    model::project::Entity::update(updated_model)
        .exec(db)
        .await
        .unwrap();

    Ok(Status::Ok)
}

#[get("/<project_id>/morgage_rate?<amortisation>")]
async fn get_morgage_rate(
    project_id: String,
    amortisation: u8,
    db: &State<DatabaseConnection>,
) -> Result<Json<MorgageRateResponse>, Status> {
    let morgage_rate = get_morgage_offer(project_id, amortisation, db).await?;
    Ok(Json(MorgageRateResponse {
        cost_per_month: morgage_rate.monthlyPayment,
        payoff_time: morgage_rate.totalLoanDurationMonths,
        bank_name: morgage_rate.bankDetails.bankName.to_owned(),
    }))
}

async fn get_morgage_offer(
    project_id: String,
    amortisation: u8,
    db: &State<DatabaseConnection>,
) -> Result<interhyp::MorgageOffer, Status> {
    let db = db as &DatabaseConnection;
    let project = model::project::Entity::find_by_id(project_id.to_owned())
        .one(db)
        .await
        .unwrap();

    if project.is_none() {
        return Err(Status::NotFound);
    }
    let project = project.unwrap();

    let morgage_rate = crate::interhyp::get_morgage_rate(
        sha256::digest(project_id),
        project.zip_code as u32,
        project.total_cost.unwrap(),
        amortisation,
    )
    .await
    .unwrap();

    Ok(morgage_rate[0].clone())
}

async fn get_project_by_id(
    db: &State<DatabaseConnection>,
    id: &str,
) -> Result<model::project::Model, Status> {
    let db = db as &DatabaseConnection;
    let res = model::project::Entity::find_by_id(id.to_owned())
        .one(db)
        .await
        .unwrap();
    if res.is_none() {
        return Err(Status::NotFound);
    }
    Ok(res.unwrap())
}

pub fn routes() -> Vec<rocket::Route> {
    routes![
        get_all_projects,
        get_project,
        create_project,
        update_project_status,
        get_morgage_rate
    ]
}
