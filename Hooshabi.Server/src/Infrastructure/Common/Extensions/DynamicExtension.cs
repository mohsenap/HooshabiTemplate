using System.Data;
using System.Reflection;

namespace Hooshabi.Server.Infrastructure.Common.Extensions;

public static partial class DynamicExtension
{

    /// <summary>
    /// cast desired dictionary to specified class type
    /// </summary>
    /// <typeparam name="T">the desired cast result class</typeparam>
    /// <param name="properties">a dictionary with string key as field name and and object value as the value of the field</param>
    /// <returns></returns>
    public static T GetObject<T>(this Dictionary<string, object> properties)
    {
        Type type = typeof(T);
        var obj = Activator.CreateInstance(type);

        foreach (var kv in properties)
        {
            type.GetProperty(kv.Key)?.SetValue(obj, kv.Value);
        }
        return (T)obj;
    }

    public static T UpdateFromModel<T>(this T input, IDictionary<string, object> properties)
    {
        foreach (var kv in properties)
        {
            var itemInfo = input.GetType().GetProperty(kv.Key);
            itemInfo?.SetValue(input, Convert.ChangeType(kv.Value, itemInfo.PropertyType));
        }
        return input;
    }

    public static Dictionary<string, object> ToDictionary<T>(this T input) where T : class
    {
        return input.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public).ToDictionary(prop => prop.Name, prop => prop.GetValue(input, null));
    }
}
