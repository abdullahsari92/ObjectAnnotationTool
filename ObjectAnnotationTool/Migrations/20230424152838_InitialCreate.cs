using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ObjectAnnotationTool.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sinif",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(256)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sınıf", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Etiket",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(256)", nullable: false),
                    Description = table.Column<string>(type: "varchar(512)", nullable: false),
                    SınıfId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etiket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Etiket_Sınıf_SınıfId",
                        column: x => x.SınıfId,
                        principalTable: "Sinif",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Etiket_SınıfId",
                table: "Etiket",
                column: "SınıfId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Etiket");

            migrationBuilder.DropTable(
                name: "Sinif");
        }
    }
}
