using Hooshabi.Server.Application.Multitenancy;

namespace Hooshabi.Server.Host.Controllers.Multitenancy;

public class TenantsController : VersionNeutralApiController
{
    [HttpGet]
    [MustHavePermission(HooshabiAction.View, HooshabiResource.Tenants)]
    [OpenApiOperation("Get a list of all tenants.", "")]
    public Task<List<TenantDto>> GetListAsync()
    {
        return Mediator.Send(new GetAllTenantsRequest());
    }

    [HttpGet("{id}")]
    [MustHavePermission(HooshabiAction.View, HooshabiResource.Tenants)]
    [OpenApiOperation("Get tenant details.", "")]
    public Task<TenantDto> GetAsync(string id)
    {
        return Mediator.Send(new GetTenantRequest(id));
    }

    [HttpPost]
    [MustHavePermission(HooshabiAction.Create, HooshabiResource.Tenants)]
    [OpenApiOperation("Create a new tenant.", "")]
    public Task<string> CreateAsync(CreateTenantRequest request)
    {
        return Mediator.Send(request);
    }

    [HttpPost("{id}/activate")]
    [MustHavePermission(HooshabiAction.Update, HooshabiResource.Tenants)]
    [OpenApiOperation("Activate a tenant.", "")]
    [ApiConventionMethod(typeof(HooshabiApiConventions), nameof(HooshabiApiConventions.Register))]
    public Task<string> ActivateAsync(string id)
    {
        return Mediator.Send(new ActivateTenantRequest(id));
    }

    [HttpPost("{id}/deactivate")]
    [MustHavePermission(HooshabiAction.Update, HooshabiResource.Tenants)]
    [OpenApiOperation("Deactivate a tenant.", "")]
    [ApiConventionMethod(typeof(HooshabiApiConventions), nameof(HooshabiApiConventions.Register))]
    public Task<string> DeactivateAsync(string id)
    {
        return Mediator.Send(new DeactivateTenantRequest(id));
    }

    [HttpPost("{id}/upgrade")]
    [MustHavePermission(HooshabiAction.UpgradeSubscription, HooshabiResource.Tenants)]
    [OpenApiOperation("Upgrade a tenant's subscription.", "")]
    [ApiConventionMethod(typeof(HooshabiApiConventions), nameof(HooshabiApiConventions.Register))]
    public async Task<ActionResult<string>> UpgradeSubscriptionAsync(string id, UpgradeSubscriptionRequest request)
    {
        return id != request.TenantId
            ? BadRequest()
            : Ok(await Mediator.Send(request));
    }
}