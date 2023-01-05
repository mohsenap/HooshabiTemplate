using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Migrators.MySQL.Migrations.Application
{
    public partial class SecondMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
           name: "Entity1",
           schema: "Catalog",
           columns: table => new
           {
               Id = table.Column<int>(type: "int", nullable: false, collation: "ascii_general_ci").Annotation("MySql:ValueGenerationStrategy",
                            MySqlValueGenerationStrategy.IdentityColumn),
               Name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: false)
                   .Annotation("MySql:CharSet", "utf8mb4"),
               Description = table.Column<string>(type: "longtext", nullable: true)
                   .Annotation("MySql:CharSet", "utf8mb4"),
               TenantId = table.Column<string>(type: "varchar(64)", maxLength: 64, nullable: false)
                   .Annotation("MySql:CharSet", "utf8mb4"),
               CreatedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
               CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
               LastModifiedBy = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
               LastModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
               DeletedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
               DeletedBy = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci")
           },
           constraints: table =>
           {
               table.PrimaryKey("PK_Entity1", x => x.Id);
           })
           .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Entity1",
                schema: "Catalog");
        }
    }
}
