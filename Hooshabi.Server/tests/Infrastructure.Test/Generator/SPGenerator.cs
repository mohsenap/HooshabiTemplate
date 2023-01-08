using Infrastructure.Test.Multitenancy.Fixtures;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;
using Xunit.Microsoft.DependencyInjection.Abstracts;

namespace Infrastructure.Test.Generator;

public class SPGenerator : TestBed<TestFixture>
{
    public SPGenerator(ITestOutputHelper testOutputHelper, TestFixture fixture)
        : base(testOutputHelper, fixture)
    {
    }

    private readonly string[] SqlServerTypes = { "bigint", "binary", "bit", "char", "date", "datetime", "datetime2", "datetimeoffset", "decimal", "filestream", "float", "geography", "geometry", "hierarchyid", "image", "int", "money", "nchar", "ntext", "numeric", "nvarchar", "real", "rowversion", "smalldatetime", "smallint", "smallmoney", "sql_variant", "text", "time", "timestamp", "tinyint", "uniqueidentifier", "varbinary", "varchar", "xml" };
    private readonly string[] CSharpTypes = { "long", "byte[]", "bool", "char", "DateTime", "DateTime", "DateTime", "DateTimeOffset", "decimal", "byte[]", "double", "Microsoft.SqlServer.Types.SqlGeography", "Microsoft.SqlServer.Types.SqlGeometry", "Microsoft.SqlServer.Types.SqlHierarchyId", "byte[]", "int", "decimal", "string", "string", "decimal", "string", "Single", "byte[]", "DateTime", "short", "decimal", "object", "string", "TimeSpan", "byte[]", "byte", "Guid", "byte[]", "string", "string" };
    private readonly System.Data.DbType[] DbTypes = { System.Data.DbType.Int64, System.Data.DbType.Binary, System.Data.DbType.Boolean, System.Data.DbType.String, System.Data.DbType.DateTime, System.Data.DbType.DateTime, System.Data.DbType.DateTime, System.Data.DbType.DateTimeOffset, System.Data.DbType.Decimal, System.Data.DbType.Binary, System.Data.DbType.Double, System.Data.DbType.Binary, System.Data.DbType.Binary, System.Data.DbType.Binary, System.Data.DbType.Binary, System.Data.DbType.Int32, System.Data.DbType.Decimal, System.Data.DbType.String, System.Data.DbType.String, System.Data.DbType.Decimal, System.Data.DbType.String, System.Data.DbType.Single, System.Data.DbType.Binary, System.Data.DbType.DateTime, System.Data.DbType.Int16, System.Data.DbType.Decimal, System.Data.DbType.Object, System.Data.DbType.String, System.Data.DbType.Time, System.Data.DbType.Binary, System.Data.DbType.Binary, System.Data.DbType.Guid, System.Data.DbType.Binary, System.Data.DbType.String, System.Data.DbType.String };

    public string ConvertSqlServerFormatToCSharp(string typeName)
    {
        var index = Array.IndexOf(SqlServerTypes, typeName);

        return index > -1
            ? CSharpTypes[index]
            : "object";
    }

    public string? ConvertCSharpFormatToSqlServer(string typeName)
    {
        var index = Array.IndexOf(CSharpTypes, typeName);

        return index > -1
            ? SqlServerTypes[index]
            : null;
    }

    public DbType ConvertDBTypesToSqlServer(string typeName)
    {
        var index = Array.IndexOf(SqlServerTypes, typeName);

        return index > -1
            ? DbTypes[index]
            : DbType.String;
    }

    public static string FromDotNetTypeToCSharpType(string dotNetTypeName, bool isNull = false)
    {
        string cstype = "";
        string nullable = isNull ? "?" : "";
        string prefix = "System.";
        string typeName = dotNetTypeName.StartsWith(prefix) ? dotNetTypeName.Remove(0, prefix.Length) : dotNetTypeName;

        switch (typeName)
        {
            case "Boolean": cstype = "bool"; break;
            case "Byte": cstype = "byte"; break;
            case "SByte": cstype = "sbyte"; break;
            case "Char": cstype = "char"; break;
            case "Decimal": cstype = "decimal"; break;
            case "Double": cstype = "double"; break;
            case "Single": cstype = "float"; break;
            case "Int32": cstype = "int"; break;
            case "UInt32": cstype = "uint"; break;
            case "Int64": cstype = "long"; break;
            case "UInt64": cstype = "ulong"; break;
            case "Object": cstype = "object"; break;
            case "Int16": cstype = "short"; break;
            case "UInt16": cstype = "ushort"; break;
            case "String": cstype = "string"; break;

            default: cstype = typeName; break; // do nothing
        }
        return $"{cstype}{nullable}";

    }

    public static string FromCSharpTypeToDotNetType(string dotNetTypeName, bool isNull = false)
    {
        string cstype = "";
        string nullable = isNull ? "?" : "";
        string prefix = "System.";
        string typeName = dotNetTypeName.StartsWith(prefix) ? dotNetTypeName.Remove(0, prefix.Length) : dotNetTypeName;

        switch (typeName)
        {
            case "bool": cstype = "Boolean"; break;
            case "byte": cstype = "Byte"; break;
            case "sbyte": cstype = "SByte"; break;
            case "char": cstype = "Char"; break;
            case "decimal": cstype = "Decimal"; break;
            case "double": cstype = "Double"; break;
            case "float": cstype = "Single"; break;
            case "int": cstype = "Int32"; break;
            case "uint": cstype = "UInt32"; break;
            case "long": cstype = "Int64"; break;
            case "ulong": cstype = "UInt64"; break;
            case "object": cstype = "Object"; break;
            case "short": cstype = "Int16"; break;
            case "ushort": cstype = "UInt16"; break;
            case "string": cstype = "String"; break;

            default: cstype = typeName; break; // do nothing
        }
        return $"{prefix}{cstype}{nullable}";

    }


    [Theory]
    [InlineData("server=.;uid=sa;pwd=mohsen;database=CP-900-Demo;MultipleActiveResultSets=true;App=HooshabiDotnet")]
    public void GnratSPModls(string connctionString)
    {
        var folder = Directory.GetParent(Directory.GetParent(Directory.GetParent(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)).FullName).FullName);
        var classTpl = folder + "\\Generator\\Templates\\ClassTpl.txt";
        var classSPParam = folder + "\\Generator\\Templates\\ClassSPParam.txt";
        var outFolder = @"D:\Projects\HooshabiTemplate\SPOutput\";

        DbContextOptionsBuilder builder = new DbContextOptionsBuilder();
        DbContext dbContxt = new DbContext(builder.UseSqlServer(connctionString).Options);
        var connection = dbContxt.Database.GetDbConnection();
        var command = connection.CreateCommand();
        connection.Open();
        command.CommandText="SELECT * FROM information_schema.parameters WHERE (SPECIFIC_NAME = '' OR 1 = 1) AND SPECIFIC_CATALOG='CP-900-Demo'";

        var reader = command.ExecuteReader();
        var schema = reader.GetColumnSchema();
        List<dynamic> list = new List<dynamic>();
        while (reader.Read())
        {
            dynamic rec = new ExpandoObject();
            foreach (var item in schema)
            {
                ((IDictionary<string, object>)rec).Add(item.ColumnName, reader.GetValue(reader.GetOrdinal(item.ColumnName)));
            }
            list.Add(rec);
        }

        Dictionary<string, object> result = new Dictionary<string, object>();
        var groupted = list.GroupBy(t => t.SPECIFIC_NAME);
        foreach (var itemGroupted in groupted)
        {
            try
            {
                var newcommand = connection.CreateCommand();
                newcommand.CommandText= itemGroupted.Key;
                newcommand.CommandType = System.Data.CommandType.StoredProcedure;

                string propTpl = "";
                var tpl = System.IO.File.ReadAllText(classSPParam);
                foreach (var item in itemGroupted)
                {
                    DbParameter par = command.CreateParameter();
                    par.ParameterName= item.PARAMETER_NAME;
                    par.Size = item.CHARACTER_MAXIMUM_LENGTH.GetType() == typeof(System.DBNull) && item.CHARACTER_MAXIMUM_LENGTH == System.DBNull.Value ? 0 : (int)item.CHARACTER_MAXIMUM_LENGTH;
                    par.DbType = ConvertDBTypesToSqlServer(item.DATA_TYPE);
                    par.Direction = item.PARAMETER_MODE == "IN" ? System.Data.ParameterDirection.Input : (item.PARAMETER_MODE == "INOUT" ? System.Data.ParameterDirection.InputOutput : System.Data.ParameterDirection.Output);
                    var typename = FromCSharpTypeToDotNetType(ConvertSqlServerFormatToCSharp((string)item.DATA_TYPE), false);
                    object instance = null;
                    if ("System.String" == typename)
                    {
                        par.Value  = string.Empty;
                    }
                    else if ("System.DateTime" == typename)
                    {
                        par.Value = DateTime.Now.ToString();
                    }
                    else
                    {
                        instance = Activator.CreateInstance(Type.GetType(typename));
                        par.Value = instance;
                    }
                    newcommand.Parameters.Add(par);

                    if (!string.IsNullOrEmpty(item.PARAMETER_NAME))
                    {
                        var cplType = ConvertSqlServerFormatToCSharp(item.DATA_TYPE);
                        var nullable = "";
                        propTpl += $"public {ConvertSqlServerFormatToCSharp(item.DATA_TYPE)}{""} {item.PARAMETER_NAME.Replace("@", "")} {{ get; set; }}" + Environment.NewLine;
                    }
                    else
                    {
                    }
                }

                tpl = tpl.Replace("__Name__", itemGroupted.Key.Replace("@", "")).Replace("__Properties__", propTpl);
                System.IO.File.WriteAllText(outFolder +itemGroupted.Key+"SpParam.cs", tpl);
                var newreader = newcommand.ExecuteReader();
                var newschema = newreader.GetColumnSchema();
                result.Add(itemGroupted.Key, newschema);
            }
            catch (Exception ex)
            {

            }
        }


        foreach (var table in result)
        {
            string propTpl = "";
            var tpl = System.IO.File.ReadAllText(classTpl);
            foreach (var column in ((IEnumerable<object>)table.Value).ToList())
            {
                var cplType = column.GetType();
                if (!string.IsNullOrEmpty(cplType.GetProperty("ColumnName").GetValue(column).ToString()) && cplType.GetProperty("DataType")?.GetValue(column) != null)
                {
                    var nullable = ((bool)cplType.GetProperty("AllowDBNull").GetValue(column)) ? "?" : "";
                    propTpl += $"public { FromDotNetTypeToCSharpType(((dynamic)cplType.GetProperty("DataType").GetValue(column)).Name, false)}{nullable} {(cplType.GetProperty("ColumnName").GetValue(column))} {{ get; set; }}" + Environment.NewLine;
                }
            }
            tpl = tpl.Replace("__Name__", table.Key).Replace("__Properties__", propTpl);
            System.IO.File.WriteAllText(outFolder + table.Key+"SpResult.cs", tpl);
        }

        //List<dynamic> newlist = new List<dynamic>();
        //while (newreader.Read())
        //{
        //    dynamic rec = new ExpandoObject();
        //    foreach (var item in newschema)
        //    {
        //        ((IDictionary<string, object>)rec).Add(item.ColumnName, newreader.GetValue(newreader.GetOrdinal(item.ColumnName)));
        //    }
        //    newlist.Add(rec);
        //}

        Assert.True(true);
    }

    protected override void Clear()
    {
    }

    protected override ValueTask DisposeAsyncCore()
    {
        return new();
    }
}
