using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hooshabi.Server.Shared;

public class Utility
{
    public static T ReplaceProperties<T>(T source, object model)
    {
        var sourceProps = source.GetType().GetProperties();
        var destType = model.GetType();
        var destProps = destType.GetProperties();
        foreach (var item in sourceProps.Where(t => destProps.Any(u => u.Name == t.Name)))
        {
            item.SetValue(source, Convert.ChangeType(destType.GetProperty(item.Name).GetValue(model), item.PropertyType) );
        }
        return source;
    }
}
