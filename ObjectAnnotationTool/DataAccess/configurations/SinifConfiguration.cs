
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ObjectAnnotationTool.DataAccess.Entity;

namespace AS.Data.Configurations;

/// <inheritdoc />
/// <summary>
/// Veri tabaný User tablosu konfigürasyonu
/// </summary>
internal class SinifConfiguration : IEntityTypeConfiguration<Sinif>
{
    public void Configure(EntityTypeBuilder<Sinif> builder)
    {
        // Tablo adý
        builder.ToTable("Sinif");

        builder.HasKey(x => x.Id);
            
      
        builder.Property(x => x.Name).IsRequired().HasColumnType("varchar(256)");
  

    }
}