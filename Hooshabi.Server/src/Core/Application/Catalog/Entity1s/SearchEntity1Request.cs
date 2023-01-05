namespace Hooshabi.Server.Application.Catalog.Entity1s;

public class SearchEntity1Request : PaginationFilter, IRequest<PaginationResponse<Entity1Dto>>
{
}

public class Entity1BySearchRequestSpec : EntitiesByPaginationFilterSpec<Entity1, Entity1Dto>
{
    public Entity1BySearchRequestSpec(SearchEntity1Request request)
        : base(request) =>
        Query.OrderBy(t => t.Id);
}

public class SearchEntity1RequestHandler : IRequestHandler<SearchEntity1Request, PaginationResponse<Entity1Dto>>
{
    private readonly IReadRepository<Entity1> _repository;

    public SearchEntity1RequestHandler(IReadRepository<Entity1> repository) => _repository = repository;

    public async Task<PaginationResponse<Entity1Dto>> Handle(SearchEntity1Request request, CancellationToken cancellationToken)
    {
        var spec = new Entity1BySearchRequestSpec(request);
        return await _repository.PaginatedListAsync(spec, request.PageNumber, request.PageSize, cancellationToken);
    }
}