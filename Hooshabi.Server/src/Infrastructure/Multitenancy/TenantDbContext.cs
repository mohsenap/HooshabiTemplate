using Finbuckle.MultiTenant.Stores;
using Hooshabi.Server.Infrastructure.Persistence.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Hooshabi.Server.Infrastructure.Multitenancy;

public class TenantDbContext : EFCoreStoreDbContext<HooshabiTenantInfo>
{
    public TenantDbContext(DbContextOptions<TenantDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<HooshabiTenantInfo>().ToTable("Tenants", SchemaNames.MultiTenancy);
    }
}