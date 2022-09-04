using Hooshabi.Client.Client.Infrastructure.Auth;
using Hooshabi.Client.Client.Infrastructure.Common;
using Hooshabi.WebApi.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;

namespace Hooshabi.Client.Client.Shared;

public partial class NavMenu
{
    [CascadingParameter]
    protected Task<AuthenticationState> AuthState { get; set; } = default!;
    [Inject]
    protected IAuthorizationService AuthService { get; set; } = default!;

    private string? _hangfireUrl;
    private bool _canViewHangfire;
    private bool _canViewDashboard;
    private bool _canViewRoles;
    private bool _canViewUsers;
    private bool _canViewProducts;
    private bool _canViewBrands;
    private bool _canViewTenants;
    private bool CanViewAdministrationGroup => _canViewUsers || _canViewRoles || _canViewTenants;

    protected override async Task OnParametersSetAsync()
    {
        _hangfireUrl = Config[ConfigNames.ApiBaseUrl] + "jobs";
        var user = (await AuthState).User;
        _canViewHangfire = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Hangfire);
        _canViewDashboard = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Dashboard);
        _canViewRoles = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Roles);
        _canViewUsers = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Users);
        _canViewProducts = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Products);
        _canViewBrands = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Brands);
        _canViewTenants = await AuthService.HasPermissionAsync(user, HooshabiAction.View, HooshabiResource.Tenants);
    }
}