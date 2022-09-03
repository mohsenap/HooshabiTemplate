using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging.Abstractions;

namespace Infrastructure.Test.Caching;

public class LocalCacheService : CacheService<Hooshabi.Server.Infrastructure.Caching.LocalCacheService>
{
    protected override Hooshabi.Server.Infrastructure.Caching.LocalCacheService CreateCacheService() =>
        new(
            new MemoryCache(new MemoryCacheOptions()),
            NullLogger<Hooshabi.Server.Infrastructure.Caching.LocalCacheService>.Instance);
}