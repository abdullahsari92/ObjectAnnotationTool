
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ObjectAnnotationTool.DataAccess.Entity;

namespace AS.Data.Configurations;

/// <inheritdoc />
/// <summary>
/// Veri tabaný User tablosu konfigürasyonu
/// </summary>
internal class EtiketConfiguration : IEntityTypeConfiguration<Etiket>
{
    public void Configure(EntityTypeBuilder<Etiket> builder)
    {
        // Tablo adý
        builder.ToTable("Etiket");

        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();


        builder.HasOne(x => x.Sinif).WithMany(y => y.Etiketler).IsRequired().HasForeignKey(x => x.SinifId).OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.Name).IsRequired().HasColumnType("varchar(256)");
        builder.Property(x => x.Description).HasColumnType("varchar(512)");
  

    }
}