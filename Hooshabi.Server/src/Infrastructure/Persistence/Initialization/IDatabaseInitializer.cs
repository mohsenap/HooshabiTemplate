using Hooshabi.Server.Infrastructure.Multitenancy;

namespace Hooshabi.Server.Infrastructure.Persistence.Initialization;

internal interface IDatabaseInitializer
{
    Task InitializeDatabasesAsync(CancellationToken cancellationToken);
    Task InitializeApplicationDbForTenantAsync(HooshabiTenantInfo tenant, CancellationToken cancellationToken);
}