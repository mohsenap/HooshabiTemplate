using Hooshabi.Server.Shared;
namespace Hooshabi.Server.Application.Catalog.Entity1s;


public class CreateEntity1Request : IRequest<int>
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

}

public class CreateEntity1RequestValidator : CustomValidator<CreateEntity1Request>
{
    public CreateEntity1RequestValidator(IReadRepository<Entity1> repository, IStringLocalizer<CreateEntity1RequestValidator> localizer)
    {
    }
}

public class CreateEntity1RequestHandler : IRequestHandler<CreateEntity1Request, int>
{
    // Add Domain Events automatically by using IRepositoryWithEvents
    private readonly IRepositoryWithEvents<Entity1> _repository;

    public CreateEntity1RequestHandler(IRepositoryWithEvents<Entity1> repository) => _repository = repository;

    public async Task<int> Handle(CreateEntity1Request request, CancellationToken cancellationToken)
    {
        var entity = Utility.ReplaceProperties(new Entity1(), request);
        await _repository.AddAsync(entity, cancellationToken);
        return entity.Id;
    }
}