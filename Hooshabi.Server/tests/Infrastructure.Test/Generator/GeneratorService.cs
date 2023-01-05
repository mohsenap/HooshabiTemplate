using FluentAssertions;
using Hooshabi.Server.Application.Common.Caching;
using Hooshabi.Server.Application.Common.Persistence;
using Hooshabi.Server.Domain.Common.Contracts;
using Infrastructure.Test.Multitenancy.Fixtures;
using System.Reflection;
using Xunit;
using Xunit.Abstractions;
using Xunit.Microsoft.DependencyInjection.Abstracts;
using Hooshabi.Server.Infrastructure.Common.Extensions;

namespace Infrastructure.Test.Generator;

public class GeneratorService : TestBed<TestFixture>
{
    private readonly IConnectionStringSecurer? _makeSecureConnectionString;
    public GeneratorService(ITestOutputHelper testOutputHelper, TestFixture fixture)
        : base(testOutputHelper, fixture)
    {
        _makeSecureConnectionString = _fixture.GetService<IConnectionStringSecurer>(_testOutputHelper);
    }

    [Theory]
    [InlineData("Entity1")]
    public void MakeSecureTest(string Entity)
    {
        var instances = GetEnumerableOfType();
        if (!string.IsNullOrEmpty(Entity))
        {
            instances = instances.Where(t => t.Key.Name.ToLower().Contains(Entity.ToLower())).ToDictionary(t => t.Key, u => u.Value);
        }
        foreach (var instance in instances)
        {
            var name = instance.Key.Name;
            var keyType = instance.Key.GetProperty("Id").PropertyType.Name.FromDotNetTypeToCSharpType(false);
            var propertiesString = "";
            PropertyInfo[] properties = instance.Key.GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.DeclaredOnly);
            foreach (var property in properties)
            {
                propertiesString+= $"public {(property.PropertyType.Name.FromDotNetTypeToCSharpType(false))} {property.Name} {{ get; set; }}" + Environment.NewLine;
            }

            var rootFolder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName).FullName).FullName).FullName;
            var folder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName);
            var destCatalogDirectory = rootFolder + $"\\src\\Core\\Application\\Catalog\\{name}s";
            var destControllerDirectory = rootFolder + $"\\src\\Host\\Controllers\\Catalog";


            //DTO
            var dtoFile = folder + "\\Generator\\Templates\\EntityDto.txt";
            var dtoFileContent = File.ReadAllText(dtoFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString);
            var destDtoFile = $"{destCatalogDirectory}\\{name}Dto.cs";


            //CreateRequest
            var createFile = folder + "\\Generator\\Templates\\CreateEntityRequest.txt";
            var createFileContent = File.ReadAllText(createFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destcreateFile = $"{destCatalogDirectory}\\Create{name}Request.cs";


            //UpdateRequest
            var updateFile = folder + "\\Generator\\Templates\\UpdateEntityRequest.txt";
            var updateFileContent = File.ReadAllText(updateFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destupdateFile = $"{destCatalogDirectory}\\Update{name}Request.cs";


            //SearchRequest
            var searchFile = folder + "\\Generator\\Templates\\SearchEntityRequest.txt";
            var searchFileContent = File.ReadAllText(searchFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destsearchFile = $"{destCatalogDirectory}\\Search{name}Request.cs";


            //GetRequest
            var getFile = folder + "\\Generator\\Templates\\GetEntityRequest.txt";
            var getFileContent = File.ReadAllText(getFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destgetFile = $"{destCatalogDirectory}\\Get{name}Request.cs";


            //DeleteRequest
            var deleteFile = folder + "\\Generator\\Templates\\DeleteEntityRequest.txt";
            var deleteFileContent = File.ReadAllText(deleteFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destdeleteFile = $"{destCatalogDirectory}\\Delete{name}Request.cs";


            //Controller
            var controllerFile = folder + "\\Generator\\Templates\\EntityController.txt";
            var controllerFileContent = File.ReadAllText(controllerFile).Replace("$$Entity$$", name).Replace("$$Properties$$", propertiesString).Replace("$$KeyType$$", keyType);
            var destcontrollerFile = $"{destControllerDirectory}\\{name}Controller.cs";


            var applicationDbContextFilePath = rootFolder + @"\src\Infrastructure\Persistence\Context\ApplicationDbContext.cs";
            var applicationDbContextFileContent = File.ReadAllText(applicationDbContextFilePath);
            var tempDbSet = $"public DbSet<{name}> {name} => Set<{name}>();";
            if (applicationDbContextFileContent.IndexOf(tempDbSet)<0)
                applicationDbContextFileContent =  applicationDbContextFileContent.Replace("//$$Properties$$//", tempDbSet +  Environment.NewLine+ "//$$Properties$$//" + Environment.NewLine);

            var catalogConfigPath = rootFolder + @"\src\Infrastructure\Persistence\Configuration\Catalog.cs";
            var catalogConfigContent = File.ReadAllText(catalogConfigPath);
            var tempConfig = $"IEntityTypeConfiguration<{name}>";
            var templateConfig = $"public class Entity1Config : IEntityTypeConfiguration<{name}>"+
            "{"+
            $"    public void Configure(EntityTypeBuilder<{name}> builder)"+
            "    {"+
            "        builder.IsMultiTenant();"+
            "    }"+
            "}";
            if (catalogConfigContent.IndexOf(tempConfig)<0)
                catalogConfigContent = catalogConfigContent.Replace("//$$EntityConfig$$//", templateConfig + Environment.NewLine+ "//$$EntityConfig$$//" + Environment.NewLine);


            if (!Directory.Exists(destCatalogDirectory))
                Directory.CreateDirectory(destCatalogDirectory);
            if (!Directory.Exists(destControllerDirectory))
                Directory.CreateDirectory(destControllerDirectory);
            File.WriteAllText(destDtoFile, dtoFileContent);
            File.WriteAllText(destcreateFile, createFileContent);
            File.WriteAllText(destupdateFile, updateFileContent);
            File.WriteAllText(destsearchFile, searchFileContent);
            File.WriteAllText(destgetFile, getFileContent);
            File.WriteAllText(destdeleteFile, deleteFileContent);
            File.WriteAllText(destcontrollerFile, controllerFileContent);
            File.WriteAllText(applicationDbContextFilePath, applicationDbContextFileContent);
            File.WriteAllText(catalogConfigPath, catalogConfigContent);
        }
        Assert.True(true);
    }

    protected override void Clear()
    {
    }

    protected override ValueTask DisposeAsyncCore()
    {
        return new();
    }

    public static Dictionary<Type, object> GetEnumerableOfType(params object[] constructorArgs)
    {
        Dictionary<Type, object> objects = new Dictionary<Type, object>();
        foreach (Type type in
            typeof(Hooshabi.Server.Domain.Common.Events.EntityCreatedEvent).Assembly.GetTypes().Where(myType => myType.IsClass && !myType.IsAbstract && myType.GetInterfaces().Any(u => u.Name.Contains("IAuditableEntity"))))
        {
            try
            {
                objects.Add(type, Activator.CreateInstance(type, constructorArgs));
            }
            catch (Exception ex)
            {

            }
        }
        return objects;
    }
}