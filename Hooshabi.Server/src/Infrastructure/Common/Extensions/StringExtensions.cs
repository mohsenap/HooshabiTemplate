using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hooshabi.Server.Infrastructure.Common.Extensions;

public static class StringExtensions
{
    public static string FromDotNetTypeToCSharpType(this string dotNetTypeName, bool isNull = false)
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
}
