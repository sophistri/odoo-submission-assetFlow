using Microsoft.EntityFrameworkCore;
using AssetFlow.Api.Models;

namespace AssetFlow.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Asset> Assets => Set<Asset>();
    public DbSet<AssetCategory> AssetCategories => Set<AssetCategory>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<AssetAttachment> AssetAttachments => Set<AssetAttachment>();
    public DbSet<AssetHistory> AssetHistories => Set<AssetHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Asset>()
            .HasIndex(a => a.AssetTag)
            .IsUnique();
        modelBuilder.Entity<Department>()
            .HasOne(d => d.DepartmentHead)
            .WithMany()
            .HasForeignKey(d => d.DepartmentHeadId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Department>()
            .HasOne(d => d.ParentDepartment)
            .WithMany()
            .HasForeignKey(d => d.ParentDepartmentId)
            .OnDelete(DeleteBehavior.Restrict);
            }
}