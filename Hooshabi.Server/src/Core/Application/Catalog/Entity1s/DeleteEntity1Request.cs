using Hooshabi.Server.Application.Catalog.Products;

namespace Hooshabi.Server.Application.Catalog.Entity1s;

public class DeleteEntity1Request : IRequest<int>
{
    public int Id { get; set; }

    public DeleteEntity1Request(int id) => Id = id;
}

public class DeleteEntity1RequestHandler : IRequestHandler<DeleteEntity1Request, int>
{
    // Add Domain Events automatically by using IRepositoryWithEvents
    private readonly IRepositoryWithEvents<Entity1> _Entity1Repo;
    private readonly IStringLocalizer<DeleteEntity1RequestHandler> _localizer;

    public DeleteEntity1RequestHandler(IRepositoryWithEvents<Entity1> Entity1Repo, IStringLocalizer<DeleteEntity1RequestHandler> localizer) =>
        (_Entity1Repo, _localizer) = (Entity1Repo, localizer);

    public async Task<int> Handle(DeleteEntity1Request request, CancellationToken cancellationToken)
    {

        var entity = await _Entity1Repo.GetByIdAsync(request.Id, cancellationToken);

        _ = entity ?? throw new NotFoundException(_localizer["Entity1.notfound"]);
        await _Entity1Repo.DeleteAsync(entity, cancellationToken);
        return request.Id;
    }
}