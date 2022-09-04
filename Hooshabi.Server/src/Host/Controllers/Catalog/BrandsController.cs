using Hooshabi.Server.Application.Catalog.Brands;

namespace Hooshabi.Server.Host.Controllers.Catalog;

public class BrandsController : VersionedApiController
{
    [HttpPost("search")]
    [MustHavePermission(HooshabiAction.Search, HooshabiResource.Brands)]
    [OpenApiOperation("Search brands using available filters.", "")]
    public Task<PaginationResponse<BrandDto>> SearchAsync(SearchBrandsRequest request)
    {
        return Mediator.Send(request);
    }

    [HttpGet("{id:guid}")]
    [MustHavePermission(HooshabiAction.View, HooshabiResource.Brands)]
    [OpenApiOperation("Get brand details.", "")]
    public Task<BrandDto> GetAsync(Guid id)
    {
        return Mediator.Send(new GetBrandRequest(id));
    }

    [HttpPost]
    [MustHavePermission(HooshabiAction.Create, HooshabiResource.Brands)]
    [OpenApiOperation("Create a new brand.", "")]
    public Task<Guid> CreateAsync(CreateBrandRequest request)
    {
        return Mediator.Send(request);
    }

    [HttpPut("{id:guid}")]
    [MustHavePermission(HooshabiAction.Update, HooshabiResource.Brands)]
    [OpenApiOperation("Update a brand.", "")]
    public async Task<ActionResult<Guid>> UpdateAsync(UpdateBrandRequest request, Guid id)
    {
        return id != request.Id
            ? BadRequest()
            : Ok(await Mediator.Send(request));
    }

    [HttpDelete("{id:guid}")]
    [MustHavePermission(HooshabiAction.Delete, HooshabiResource.Brands)]
    [OpenApiOperation("Delete a brand.", "")]
    public Task<Guid> DeleteAsync(Guid id)
    {
        return Mediator.Send(new DeleteBrandRequest(id));
    }

    [HttpPost("generate-random")]
    [MustHavePermission(HooshabiAction.Generate, HooshabiResource.Brands)]
    [OpenApiOperation("Generate a number of random brands.", "")]
    public Task<string> GenerateRandomAsync(GenerateRandomBrandRequest request)
    {
        return Mediator.Send(request);
    }

    [HttpDelete("delete-random")]
    [MustHavePermission(HooshabiAction.Clean, HooshabiResource.Brands)]
    [OpenApiOperation("Delete the brands generated with the generate-random call.", "")]
    [ApiConventionMethod(typeof(HooshabiApiConventions), nameof(HooshabiApiConventions.Search))]
    public Task<string> DeleteRandomAsync()
    {
        return Mediator.Send(new DeleteRandomBrandRequest());
    }
}