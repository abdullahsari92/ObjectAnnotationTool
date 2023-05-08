
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ObjectAnnotationTool.DataAccess.Entity;

namespace AS.Data.Configurations;

/// <inheritdoc />
/// <summary>
/// Veri tabaný User tablosu konfigürasyonu
/// </summary>
internal class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        // Tablo adý
        builder.ToTable("Document");

        builder.HasKey(x => x.Id);            
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        builder.Property(x => x.Name).IsRequired().HasColumnType("varchar(256)");
        builder.Property(x => x.Path).IsRequired().HasColumnType("varchar(500)");





    }
}