use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Project::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Project::Id)
                            .string()
                            .not_null()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Project::ZipCode).unsigned().not_null())
                    .col(ColumnDef::new(Project::Status).string().not_null())
                    .col(ColumnDef::new(Project::ProjectType).string().not_null())
                    .col(ColumnDef::new(Project::TotalCost).unsigned())
                    .col(ColumnDef::new(Project::CostPerMonth).unsigned())
                    .col(ColumnDef::new(Project::RevenuePerMonth).unsigned())
                    .col(ColumnDef::new(Project::ConstructionTime).unsigned())
                    .col(ColumnDef::new(Project::PayoffTime).unsigned())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Project::Table).to_owned())
            .await
    }
}

/// Learn more at https://docs.rs/sea-query#iden
#[derive(Iden)]
enum Project {
    Table,
    Id,
    ZipCode,
    Status,
    ProjectType,
    TotalCost,
    CostPerMonth,
    RevenuePerMonth,
    ConstructionTime,
    PayoffTime,
}
