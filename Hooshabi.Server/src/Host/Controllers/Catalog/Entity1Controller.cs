using Hooshabi.Server.Application.Catalog.Entity1s;
using Hooshabi.Server.Infrastructure.ModelBinders;

namespace Hooshabi.Server.Host.Controllers.Catalog;

public class Entity1Controller : VersionedApiController
{
    [HttpPost("search")]
    [MustHavePermission(HooshabiAction.Search, HooshabiResource.Entity1)]
    [OpenApiOperation("Search Entity1 using available filters.", "")]
    public Task<PaginationResponse<Entity1Dto>> SearchAsync(SearchEntity1Request request)
    {
        return Mediator.Send(request);
    }

    [HttpGet("{id}")]
    [MustHavePermission(HooshabiAction.View, HooshabiResource.Entity1)]
    [OpenApiOperation("Get Entity1 details.", "")]
    public Task<Entity1Dto> GetAsync(int id)
    {
        return Mediator.Send(new GetEntity1Request(id));
    }

    [HttpPost]
    [MustHavePermission(HooshabiAction.Create, HooshabiResource.Entity1)]
    [OpenApiOperation("Create a new Entity1.", "")]
    public Task<int> CreateAsync(CreateEntity1Request request)
    {
        return Mediator.Send(request);
    }

    [HttpPut("{id}")]
    [MustHavePermission(HooshabiAction.Update, HooshabiResource.Entity1)]
    [OpenApiOperation("Update a Entity1.", "")]
    public async Task<ActionResult<int>> UpdateAsync([ModelBinder(Name = "UpdateEntity1Request", BinderType = typeof(UpdateDynamicModelBinder))] UpdateEntity1Request request, int id)
    {
        return await Mediator.Send(request);
    }

    [HttpDelete("{id}")]
    [MustHavePermission(HooshabiAction.Delete, HooshabiResource.Entity1)]
    [OpenApiOperation("Delete a Entity1.", "")]
    public Task<int> DeleteAsync(int id)
    {
        return Mediator.Send(new DeleteEntity1Request(id));
    }

}