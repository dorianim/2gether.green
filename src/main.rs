// main.rs
mod fairings;
mod interhyp;
mod model;
mod routes;

use migration;
use rocket::*;

use sea_orm::*;
use sea_orm_migration::prelude::*;

// Change this according to your database implementation,
// or supply it as an environment variable.
// the database URL string follows the following format:
// "protocol://username:password@host:port/database"
const DATABASE_URL: &str = "sqlite:./2gether.green.sqlite?mode=rwc";

async fn set_up_db(url: &str) -> Result<DatabaseConnection, DbErr> {
    let db = Database::connect(url).await?;
    let db_name = "2gether.green";
    let db = match db.get_database_backend() {
        DbBackend::MySql => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE IF NOT EXISTS `{}`;", db_name),
            ))
            .await?;
            let url = format!("{}/{}", url, db_name);
            Database::connect(&url).await?
        }
        DbBackend::Postgres => {
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("DROP DATABASE IF EXISTS \"{}\";", db_name),
            ))
            .await?;
            db.execute(Statement::from_string(
                db.get_database_backend(),
                format!("CREATE DATABASE \"{}\";", db_name),
            ))
            .await?;
            let url = format!("{}/{}", url, db_name);
            Database::connect(&url).await?
        }
        DbBackend::Sqlite => db,
    };

    Ok(db)
}

#[options("/<_..>")]
fn options() {}

#[launch] // The "main" function of the program
async fn rocket() -> _ {
    let db = match set_up_db(DATABASE_URL).await {
        Ok(db) => db,
        Err(e) => panic!("{}", e),
    };

    migration::Migrator::up(&db, None)
        .await
        .expect("Error applying migrations!");

    build_rocket(db)
}

pub fn build_rocket(db: DatabaseConnection) -> Rocket<Build> {
    let db = db;

    rocket::build()
        .attach(fairings::cors::CORS)
        .manage(db)
        .mount("/", routes![options])
        .mount("/", routes::client::routes())
        //.mount("/api/v1", routes::swagger::routes())
        .mount("/api/v1/project", routes::project::routes())
}
