using Hooshabi.WebApi.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Hooshabi.Client.Client.Infrastructure.Auth;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource) =>
        Policy = HooshabiPermission.NameFor(action, resource);
}