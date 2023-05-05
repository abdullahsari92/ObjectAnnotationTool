using AS.Data.Configurations;
using Microsoft.EntityFrameworkCore;
using ObjectAnnotationTool.DataAccess.Entity;

namespace ObjectAnnotationTool.DataAccess
{
    public class EfDbContext : DbContext
    {

        public DbSet<Etiket> Etiket { get; set; }

        public DbSet<Sinif> Sinif { get; set; }

        public EfDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new EtiketConfiguration());
            modelBuilder.ApplyConfiguration(new SinifConfiguration());
            modelBuilder.ApplyConfiguration(new DocumentConfiguration());


            modelBuilder.Entity<Document>().Ignore(c => c.Image);

            base.OnModelCreating(modelBuilder);
        }

    }
}
