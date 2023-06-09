﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ObjectAnnotationTool.DataAccess;

#nullable disable

namespace ObjectAnnotationTool.Migrations
{
    [DbContext(typeof(EfDbContext))]
    [Migration("20230508132013_VB-1")]
    partial class VB1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ObjectAnnotationTool.DataAccess.Entity.Document", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(256)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("varchar(500)");

                    b.HasKey("Id");

                    b.ToTable("Document", (string)null);
                });

            modelBuilder.Entity("ObjectAnnotationTool.DataAccess.Entity.Etiket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(512)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(256)");

                    b.Property<int>("SinifId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SinifId");

                    b.ToTable("Etiket", (string)null);
                });

            modelBuilder.Entity("ObjectAnnotationTool.DataAccess.Entity.Sinif", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:IdentityIncrement", 1)
                        .HasAnnotation("SqlServer:IdentitySeed", 1L)
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.ToTable("Sinif", (string)null);
                });

            modelBuilder.Entity("ObjectAnnotationTool.DataAccess.Entity.Etiket", b =>
                {
                    b.HasOne("ObjectAnnotationTool.DataAccess.Entity.Sinif", "Sinif")
                        .WithMany("Etiketler")
                        .HasForeignKey("SinifId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Sinif");
                });

            modelBuilder.Entity("ObjectAnnotationTool.DataAccess.Entity.Sinif", b =>
                {
                    b.Navigation("Etiketler");
                });
#pragma warning restore 612, 618
        }
    }
}
