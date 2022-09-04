using Hooshabi.Server.Shared.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Hooshabi.Server.Infrastructure.Auth.Permissions;

public class MustHavePermissionAttribute : AuthorizeAttribute
{
    public MustHavePermissionAttribute(string action, string resource) =>
        Policy = HooshabiPermission.NameFor(action, resource);
}