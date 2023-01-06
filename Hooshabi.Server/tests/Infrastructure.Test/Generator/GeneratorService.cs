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
    [InlineData("Entity1", "Brand,Product")]
    public void MakeSecureTest(string tables, string IgnoreList)
    {
        var instances = GetEnumerableOfType();
        if (!string.IsNullOrEmpty(tables))
        {
            instances = instances.Where(t => tables.Split(',').Any(u => u.Trim() == t.Key.Name)).ToDictionary(t => t.Key, u => u.Value);
        }
        if (!string.IsNullOrEmpty(IgnoreList))
        {
            instances = instances.Where(t => !IgnoreList.Split(',').Any(u => u.Trim() == t.Key.Name)).ToDictionary(t => t.Key, u => u.Value);
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

            var parentRootFolder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName).FullName).FullName).FullName).FullName+"\\Hooshabi.React";
            var rootFolder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName).FullName).FullName).FullName;
            var folder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName);
            var destCatalogDirectory = rootFolder + $"\\src\\Core\\Application\\Catalog\\{name}s";
            var destControllerDirectory = rootFolder + $"\\src\\Host\\Controllers\\Catalog";
            var reactDirectory = parentRootFolder + @"D:\Projects\HooshabiTemplate\Hooshabi.React";
            var reactViewDirectory = parentRootFolder + @"\src\App\Views";
            var reactAppDirectory = parentRootFolder + @"\src\App";
            var reactModelDirectory = parentRootFolder + @"\src\App\Model";
            var reactAppManifestPath = parentRootFolder + @"\src\App\AppManifest.js";


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


            var reactAppModelsFilePath = reactModelDirectory + @"\AppModels.js";
            var reactAppManifestFilePath = reactAppDirectory + @"\AppManifest.js";
            var reactModelFilePath = reactModelDirectory + $"\\{name}Model.js";
            var reactGridModelFilePath = reactModelDirectory + $"\\{name}GridModel.js";
            var reactViewFilePath = reactViewDirectory + $"\\{name}\\{name}View.js";
            var reactCssViewFilePath = reactViewDirectory + $"\\{name}\\{name.ToLower()}viewcss.js";

            var reactAppManifestFileContent = File.ReadAllText(reactAppManifestFilePath);
            var reactAppModelsFileContent = File.ReadAllText(reactAppModelsFilePath);
            var reactViewFileContent = File.ReadAllText(folder + "\\Generator\\Templates\\EntityView.txt");
            var reactViewCSSFileContent = File.ReadAllText(folder + "\\Generator\\Templates\\entityviewcss.txt");

            var tempAppManifest = $"Name: \"{name}\"";
            var tempAppModels = $"Name: \"{name}Model\"";

            if (reactAppManifestFileContent.IndexOf(tempAppManifest)<0)
            {
                reactAppManifestFileContent = reactAppManifestFileContent.Replace("//Views//", $"{{ Name: \"{name}\", Route:  \"{name.ToLower()}\", Authorize: false, Component: {name}View }}," + Environment.NewLine+ "//Views//" + Environment.NewLine);
                reactAppManifestFileContent = reactAppManifestFileContent.Replace("//References//", $"import {name}View from \"./Views/{name}/{name}View\";" + Environment.NewLine+ "//References//" + Environment.NewLine);
            }

            if (reactAppModelsFileContent.IndexOf(tempAppModels)<0)
            {
                reactAppModelsFileContent = reactAppModelsFileContent.Replace("//Models//", $"{{ Name: \"{name}Model\", Model: {name}Model }},{Environment.NewLine} {{ Name: \"{name}GridModel\", Model: {name}GridModel  }}," + Environment.NewLine+ "//Models//" + Environment.NewLine);
                reactAppModelsFileContent = reactAppModelsFileContent.Replace("//References//", $"import {name}Model from \"./{name}Model\";{Environment.NewLine} import {name}GridModel from \"./{name}GridModel\"; " + Environment.NewLine+ "//References//" + Environment.NewLine);
            }

            reactViewFileContent = reactViewFileContent.Replace("View1", name).Replace("Entity1Lowered", name.ToLower()).Replace("Entity1CSS", name.ToLower()).Replace("Entity1", name);


            var reactModelFileContent = File.ReadAllText(folder + "\\Generator\\Templates\\EntityModel.txt");
            var reactGridModelFileContent = File.ReadAllText(folder + "\\Generator\\Templates\\EntityGridModel.txt");

            var reactGridModelFileNewContent = reactGridModelFileContent;
            Task.Run(() =>
            {
                reactGridModelFileNewContent = reactGridModelFileNewContent.Replace("__EntityName__", name);

                var template = "{" +
                "title: AppContext.Translate(\"__FieldName__\", \"gridcolumn\")," +
                          "dataIndex: '__FieldName__'," +
                          "width: 80," +
                          "key: '__FieldName__'," +
                          "fixed: 'left',"+
                          "fieldType: '__Type__'," +
                          "sorter: __SortTemplate__" +
                "}";

                var templateList = new List<string>();
                var properties = Activator.CreateInstance("Hooshabi.Server.Domain", $"Hooshabi.Server.Domain.Catalog.{name}").Unwrap().GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.DeclaredOnly);
                foreach (var item in properties)
                {

                    var data = item.Name;
                    var itemType = item.PropertyType.Name.FromDotNetTypeToCSharpType();
                    var tpl = template.Replace(
                      "__Type__",
                      itemType.StartsWith("text") ||
                        itemType.StartsWith("string") ||
                        itemType.StartsWith("varchar")
                        ? "string"
                        : itemType
                    );

                    if (itemType.StartsWith("int"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("bigint"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("decimal"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("float"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("bool"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("Guid"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => (a.__FieldName__ ? a.__FieldName__ : '').localeCompare(b.__FieldName__)");
                    }
                    else if (itemType.StartsWith("Date"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => moment(a.__FieldName__).unix() - moment(b.__FieldName__).unix()");
                    }
                    else if (itemType.StartsWith("Time"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (itemType.StartsWith("short"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }
                    else if (
                     itemType.StartsWith("text") ||
                     itemType.StartsWith("string") ||
                     itemType.StartsWith("varchar")
                   )
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => (a.__FieldName__ ? a.__FieldName__ : '').localeCompare(b.__FieldName__)");
                    }
                    else if (itemType.StartsWith("tinyint"))
                    {
                        tpl = tpl.Replace(
                           "__SortTemplate__",
                           "(a, b) => a.__FieldName__ - b.__FieldName__");
                    }

                    tpl = tpl.Replace("__FieldName__", $"{item.Name}");
                    templateList.Add(tpl);
                }

                reactGridModelFileNewContent = reactGridModelFileNewContent.Replace("__Properties__", string.Join(",\r\n", templateList));

            }).Wait();

            var reactModelFileNewContent = reactModelFileContent;
            Task.Run(() =>
            {

                reactModelFileNewContent = reactModelFileNewContent.Replace("__EntityName__", name);
                var template = "\"__FieldName__\": { " +
                "\"Label\": AppContext.Translate(\"__FieldName__\", \"model\")," +
                "\"FieldType\":\"__Type__\"," +
                "\"labelCol\": { span: 6 }," +
                "\"wrapperCol\": { span: 18 }," +
                "\"Rules\": [__Required__]," +
                "\"Template\": () => { return __Template__ }," +
                "\"Random\":  __Faker____Reference__," +
                "}";

                var templateList = new List<string>();
                var properties = Activator.CreateInstance("Hooshabi.Server.Domain", $"Hooshabi.Server.Domain.Catalog.{name}").Unwrap().GetType().GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.DeclaredOnly);
                foreach (var item in properties)
                {
                    var data = item.Name;
                    var itemType = item.PropertyType.Name.FromDotNetTypeToCSharpType();
                    bool allowNull = item.GetType().Name.Contains("Nullable") || item.GetType().Name.Contains("?");
                    var tpl = template.Replace(
                      "__Type__",
                      itemType.StartsWith("text") ||
                        itemType.StartsWith("string") ||
                        itemType.StartsWith("varchar")
                        ? "string"
                        : itemType
                    );
                    tpl = tpl.Replace("__FieldName__", $"{ item.Name}");
                    tpl = tpl.Replace("__Faker__", $"{ " () => { return faker.datatype.string(6); }"}");
                    if (itemType.StartsWith("int"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }
                    else if (itemType.StartsWith("bigint"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }
                    else if (itemType.StartsWith("decimal"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }
                    else if (itemType.StartsWith("float"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }
                    else if (itemType.StartsWith("bool"))
                    {
                        tpl = tpl.Replace("__Template__", "<Checkbox />");
                    }
                    else if (itemType.StartsWith("Guid"))
                    {
                        tpl = tpl.Replace("__Template__", "<Input />");
                    }
                    else if (itemType.StartsWith("Date"))
                    {
                        tpl = tpl.Replace("__Template__", "<DatePicker />");
                    }
                    else if (itemType.StartsWith("Time"))
                    {
                        tpl = tpl.Replace("__Template__", "<TimePicker />");
                    }
                    else if (itemType.StartsWith("short"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }
                    else if (
                    itemType.StartsWith("text") ||
                    itemType.StartsWith("string") ||
                    itemType.StartsWith("varchar")
                  )
                    {
                        tpl = tpl.Replace("__Template__", "<Input />");
                    }
                    else if (itemType.StartsWith("tinyint"))
                    {
                        tpl = tpl.Replace("__Template__", "<InputNumber />");
                    }

                    tpl = tpl.Replace(
                      "__Required__",
                      allowNull || item.Name == "Id"
                        ? ""
                    : "{ \"required\": true, \"message\": \"This field is required\" }");


                    tpl = tpl.Replace("__Reference__", "");

                    templateList.Add(tpl);
                }


                reactModelFileNewContent = reactModelFileNewContent.Replace("__Properties__", string.Join(",\r\n", templateList));



            }).Wait();


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

            File.WriteAllText(reactModelDirectory+ $"\\{name}GridModel.js", reactGridModelFileNewContent);
            File.WriteAllText(reactModelDirectory+ $"\\{name}Model.js", reactModelFileNewContent);
            if (!Directory.Exists(reactViewDirectory+ $"\\{name}"))
                Directory.CreateDirectory(reactViewDirectory+ $"\\{name}");
            File.WriteAllText(reactViewDirectory+ $"\\{name}\\{name}View.js", reactViewFileContent);
            File.WriteAllText(reactViewDirectory+ $"\\{name}\\{name.ToLower()}viewcss.scss", "");
            File.WriteAllText(reactAppModelsFilePath, reactAppModelsFileContent);
            File.WriteAllText(reactAppManifestFilePath, reactAppManifestFileContent);
        }
        Assert.True(true);
    }

    private void MakeModelFromEntity(string entity)
    {

    }

    private void MakeGridModelFromEntity(string entity)
    {

    }

    private void MakeViewFromEntity(string entity)
    {

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