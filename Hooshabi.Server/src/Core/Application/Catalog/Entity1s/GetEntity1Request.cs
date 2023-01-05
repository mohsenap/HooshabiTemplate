namespace Hooshabi.Server.Application.Catalog.Entity1s;

public class GetEntity1Request : IRequest<Entity1Dto>
{
    public int Id { get; set; }

    public GetEntity1Request(int id) => Id = id;
}

public class Entity1ByIdSpec : Specification<Entity1, Entity1Dto>, ISingleResultSpecification
{
    public Entity1ByIdSpec(int id) =>
        Query.Where(p => p.Id == id);
}

public class GetEntity1RequestHandler : IRequestHandler<GetEntity1Request, Entity1Dto>
{
    private readonly IRepository<Entity1> _repository;
    private readonly IStringLocalizer<GetEntity1RequestHandler> _localizer;

    public GetEntity1RequestHandler(IRepository<Entity1> repository, IStringLocalizer<GetEntity1RequestHandler> localizer) => (_repository, _localizer) = (repository, localizer);

    public async Task<Entity1Dto> Handle(GetEntity1Request request, CancellationToken cancellationToken) =>
        await _repository.GetBySpecAsync(
            (ISpecification<Entity1, Entity1Dto>)new Entity1ByIdSpec(request.Id), cancellationToken)
        ?? throw new NotFoundException(string.Format(_localizer["Entity1.notfound"], request.Id));
}