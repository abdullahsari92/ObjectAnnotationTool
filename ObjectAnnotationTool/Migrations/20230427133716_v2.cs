using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ObjectAnnotationTool.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Etiket_Sinif_SınıfId",
                table: "Etiket");

            migrationBuilder.RenameColumn(
                name: "SınıfId",
                table: "Etiket",
                newName: "SinifId");

            migrationBuilder.RenameIndex(
                name: "IX_Etiket_SınıfId",
                table: "Etiket",
                newName: "IX_Etiket_SinifId");

            migrationBuilder.AddForeignKey(
                name: "FK_Etiket_Sinif_SinifId",
                table: "Etiket",
                column: "SinifId",
                principalTable: "Sinif",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Etiket_Sinif_SinifId",
                table: "Etiket");

            migrationBuilder.RenameColumn(
                name: "SinifId",
                table: "Etiket",
                newName: "SınıfId");

            migrationBuilder.RenameIndex(
                name: "IX_Etiket_SinifId",
                table: "Etiket",
                newName: "IX_Etiket_SınıfId");

            migrationBuilder.AddForeignKey(
                name: "FK_Etiket_Sinif_SınıfId",
                table: "Etiket",
                column: "SınıfId",
                principalTable: "Sinif",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
