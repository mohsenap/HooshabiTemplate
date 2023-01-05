using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Reflection;

namespace Hooshabi.Server.Infrastructure.Common.Extensions;
public static class DataTableExtensions
    {
        private static Dictionary<Type, IList<PropertyInfo>> typeDictionary = new Dictionary<Type, IList<PropertyInfo>>();

        public static IList<T> ToList<T>(this DataTable table) where T : new()
        {
            IList<PropertyInfo> properties = GetPropertiesForType<T>();
            IList<T> result = new List<T>();

            foreach (var row in table.Rows)
            {
                var item = CreateItemFromRow<T>((DataRow)row, properties);
                result.Add(item);
            }

            return result;
        }

        private static IList<PropertyInfo> GetPropertiesForType<T>()
        {
            var type = typeof(T);
            if (!typeDictionary.ContainsKey(typeof(T)))
            {
                typeDictionary.Add(type, type.GetProperties().ToList());
            }
            return typeDictionary[type];
        }

        private static T CreateItemFromRow<T>(DataRow row, IList<PropertyInfo> properties) where T : new()
        {
            T item = new T();
            foreach (var property in properties)
            {
                //HINT[HAMED]: this is used to skip setting value of not mapped properties from dataset
                //HINT[HAMED]: it could be removed after mapping ViewModel to DTO in all GetAll end-points and preventing using (( NotMapped )) attribute in ViewModels
                if (item.GetType().GetProperty(property.Name).CustomAttributes.Any(a => a.AttributeType.Name.Equals(nameof(NotMappedAttribute))))
                {
                    continue;
                }

                if (row[property.Name] == DBNull.Value)
                {
                    property.SetValue(item, row.IsNull(property.Name) ? null : Convert.ChangeType(row[property.Name], property.PropertyType), null);
                }
                else
                {
                    property.SetValue(item, row[property.Name]);
                }
            }
            return item;
        }

        //public static List<dynamic> ToDynamic(this DataTable dt)
        //{
        //    List<dynamic> list = new List<dynamic>();
        //    foreach (DataRow row in dt.Rows)
        //    {
        //        Dictionary<string, object> dynamicDictionary = new Dictionary<string, object>();
        //        foreach (DataColumn column in dt.Columns)
        //        {
        //            dynamicDictionary.Add(column.ColumnName, row[column]);
        //        }
        //        list.Add(dynamicDictionary.ToDynamicObject());
        //    }
        //    return list;
        //}

        public static List<string> ToList(this DataTable dt)
        {
            List<string> result = new List<string>();
            foreach (DataRow dataRow in dt.Rows)
            {
                foreach (DataColumn dataColumn in dt.Columns)
                {
                    result.Add(dataRow[dataColumn].ToString());
                }
            }
            return result;
        }

        //public static DataTable ToDataTable(this IEnumerable<dynamic> data)
        //{
        //    DataTable table = new();
        //    var columnsName = data.FirstOrDefault();
        //    var columnsNameProperties = (columnsName as DynamicViewObject).GetProperties();
        //    foreach (var item in columnsNameProperties)
        //    {
        //        table.Columns.Add(item.Key);
        //    }
        //    foreach (var item in data)
        //    {
        //        var propertiesDict = (item as DynamicViewObject).GetProperties();
        //        DataRow dataRow = table.NewRow();

        //        foreach (string column in propertiesDict.Keys)
        //        {
        //            dataRow[column] = propertiesDict[column];
        //        }

        //        table.Rows.Add(dataRow);
        //    }
        //    return table;
        //}

        public static DataTable ToDataTable<T>(this IList<T> data)
        {
            PropertyDescriptorCollection properties =
                TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new();
            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;
        }
    }
