namespace Hooshabi.Server.Application.Catalog.Entity1s;

public class UpdateEntity1Request : IRequest<int>
{
    public int Id { get; set; }
    public dynamic Model { get; set; }
}

public class UpdateEntity1RequestValidator : CustomValidator<UpdateEntity1Request>
{
    public UpdateEntity1RequestValidator(IRepository<Entity1> repository, IStringLocalizer<UpdateEntity1RequestValidator> localizer) {

    }
       // RuleFor(p => p.Name)
       //     .NotEmpty()
       //     .MaximumLength(75)
       //     .MustAsync(async (Entity1, name, ct) =>
       //             await repository.GetBySpecAsync(new Entity1ByNameSpec(name), ct)
       //                 is not Entity1 existingEntity1 || existingEntity1.Id == Entity1.Id)
       //         .WithMessage((_, name) => string.Format(localizer["Entity1.alreadyexists"], name));
}

public class UpdateEntity1RequestHandler : IRequestHandler<UpdateEntity1Request, int>
{
    // Add Domain Events automatically by using IRepositoryWithEvents
    private readonly IRepositoryWithEvents<Entity1> _repository;
    private readonly IStringLocalizer<UpdateEntity1RequestHandler> _localizer;

    public UpdateEntity1RequestHandler(IRepositoryWithEvents<Entity1> repository, IStringLocalizer<UpdateEntity1RequestHandler> localizer) =>
        (_repository, _localizer) = (repository, localizer);

    public async Task<int> Handle(UpdateEntity1Request request, CancellationToken cancellationToken)
    {
       var entity = await _repository.GetByIdAsync(request.Id, cancellationToken);
        _ = entity ?? throw new NotFoundException(string.Format(_localizer["Entity1.notfound"], request.Id));
        await _repository.UpdateDynamicAsync(entity, request.Model, cancellationToken);
        return entity.Id;
    }
}