using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Dynamic;

namespace Hooshabi.Server.Infrastructure.ModelBinders;

public class UpdateDynamicModelBinder : IModelBinder
{
    public async Task BindModelAsync(ModelBindingContext bindingContext)
    {
        using var reader = new StreamReader(bindingContext.HttpContext.Request.Body);
        string body = await reader.ReadToEndAsync();
        dynamic model = Newtonsoft.Json.JsonConvert.DeserializeObject<ExpandoObject>(body);
        var instance = Activator.CreateInstance(bindingContext.ModelType);
        var instanceType = instance?.GetType();
        instanceType?.GetProperty("Id")?.SetValue(instance, Convert.ToInt32(((IDictionary<string, object>)model).ContainsKey("Id") ? ((IDictionary<string, object>)model)["Id"] : 0));
        instanceType?.GetProperty("Model")?.SetValue(instance, model);
        bindingContext.Result = ModelBindingResult.Success(instance);
    }
}
