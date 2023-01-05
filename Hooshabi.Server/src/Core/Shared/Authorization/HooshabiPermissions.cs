using System.Collections.ObjectModel;

namespace Hooshabi.Server.Shared.Authorization;

public static class HooshabiAction
{
    public const string View = nameof(View);
    public const string Search = nameof(Search);
    public const string Create = nameof(Create);
    public const string Update = nameof(Update);
    public const string Delete = nameof(Delete);
    public const string Export = nameof(Export);
    public const string Generate = nameof(Generate);
    public const string Clean = nameof(Clean);
    public const string UpgradeSubscription = nameof(UpgradeSubscription);
}

public static class HooshabiResource
{
    public const string Tenants = nameof(Tenants);
    public const string Dashboard = nameof(Dashboard);
    public const string Hangfire = nameof(Hangfire);
    public const string Users = nameof(Users);
    public const string UserRoles = nameof(UserRoles);
    public const string Roles = nameof(Roles);
    public const string RoleClaims = nameof(RoleClaims);
    public const string Products = nameof(Products);
    public const string Brands = nameof(Brands);
    public const string Entity1 = nameof(Entity1);
    //HooshabiResource//
}

public static class HooshabiPermissions
{
    private static readonly HooshabiPermission[] _all = new HooshabiPermission[]
    {
        new("View Dashboard", HooshabiAction.View, HooshabiResource.Dashboard),
        new("View Hangfire", HooshabiAction.View, HooshabiResource.Hangfire),
        new("View Users", HooshabiAction.View, HooshabiResource.Users),
        new("Search Users", HooshabiAction.Search, HooshabiResource.Users),
        new("Create Users", HooshabiAction.Create, HooshabiResource.Users),
        new("Update Users", HooshabiAction.Update, HooshabiResource.Users),
        new("Delete Users", HooshabiAction.Delete, HooshabiResource.Users),
        new("Export Users", HooshabiAction.Export, HooshabiResource.Users),
        new("View UserRoles", HooshabiAction.View, HooshabiResource.UserRoles),
        new("Update UserRoles", HooshabiAction.Update, HooshabiResource.UserRoles),
        new("View Roles", HooshabiAction.View, HooshabiResource.Roles),
        new("Create Roles", HooshabiAction.Create, HooshabiResource.Roles),
        new("Update Roles", HooshabiAction.Update, HooshabiResource.Roles),
        new("Delete Roles", HooshabiAction.Delete, HooshabiResource.Roles),
        new("View RoleClaims", HooshabiAction.View, HooshabiResource.RoleClaims),
        new("Update RoleClaims", HooshabiAction.Update, HooshabiResource.RoleClaims),
        new("View Products", HooshabiAction.View, HooshabiResource.Products, IsBasic: true),
        new("Search Products", HooshabiAction.Search, HooshabiResource.Products, IsBasic: true),
        new("Create Products", HooshabiAction.Create, HooshabiResource.Products),
        new("Update Products", HooshabiAction.Update, HooshabiResource.Products),
        new("Delete Products", HooshabiAction.Delete, HooshabiResource.Products),
        new("Export Products", HooshabiAction.Export, HooshabiResource.Products),
        new("View Brands", HooshabiAction.View, HooshabiResource.Brands, IsBasic: true),
        new("Search Brands", HooshabiAction.Search, HooshabiResource.Brands, IsBasic: true),
        new("Create Brands", HooshabiAction.Create, HooshabiResource.Brands),
        new("Update Brands", HooshabiAction.Update, HooshabiResource.Brands),
        new("Delete Brands", HooshabiAction.Delete, HooshabiResource.Brands),
        new("Generate Brands", HooshabiAction.Generate, HooshabiResource.Brands),
        new("Clean Brands", HooshabiAction.Clean, HooshabiResource.Brands),
        new("View Tenants", HooshabiAction.View, HooshabiResource.Tenants, IsRoot: true),
        new("Create Tenants", HooshabiAction.Create, HooshabiResource.Tenants, IsRoot: true),
        new("Update Tenants", HooshabiAction.Update, HooshabiResource.Tenants, IsRoot: true),
        new("Upgrade Tenant Subscription", HooshabiAction.UpgradeSubscription, HooshabiResource.Tenants, IsRoot: true),
        new("View Entity1", HooshabiAction.View, HooshabiResource.Entity1, IsBasic: true),
        new("Search Entity1", HooshabiAction.Search, HooshabiResource.Entity1, IsBasic: true),
        new("Create Entity1", HooshabiAction.Create, HooshabiResource.Entity1),
        new("Update Entity1", HooshabiAction.Update, HooshabiResource.Entity1),
        new("Delete Entity1", HooshabiAction.Delete, HooshabiResource.Entity1),
        //HooshabiPermission//
    };

    public static IReadOnlyList<HooshabiPermission> All { get; } = new ReadOnlyCollection<HooshabiPermission>(_all);
    public static IReadOnlyList<HooshabiPermission> Root { get; } = new ReadOnlyCollection<HooshabiPermission>(_all.Where(p => p.IsRoot).ToArray());
    public static IReadOnlyList<HooshabiPermission> Admin { get; } = new ReadOnlyCollection<HooshabiPermission>(_all.Where(p => !p.IsRoot).ToArray());
    public static IReadOnlyList<HooshabiPermission> Basic { get; } = new ReadOnlyCollection<HooshabiPermission>(_all.Where(p => p.IsBasic).ToArray());
}

public record HooshabiPermission(string Description, string Action, string Resource, bool IsBasic = false, bool IsRoot = false)
{
    public string Name => NameFor(Action, Resource);
    public static string NameFor(string action, string resource) => $"Permissions.{resource}.{action}";
}