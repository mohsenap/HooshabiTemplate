import React from "react";
import moment from 'moment';
import AppContext from "../../Lib/AppContext";;

const Entity1GridModel = () => {
    var ColumnModel = [
        {title: AppContext.Translate("Id", "gridcolumn"),dataIndex: 'Id',width: 80,key: 'Id',fixed: 'left',fieldType: 'int',sorter: (a, b) => a.Id - b.Id},
{title: AppContext.Translate("Name", "gridcolumn"),dataIndex: 'Name',width: 80,key: 'Name',fixed: 'left',fieldType: 'string',sorter: (a, b) => (a.Name ? a.Name : '').localeCompare(b.Name)},
{title: AppContext.Translate("Description", "gridcolumn"),dataIndex: 'Description',width: 80,key: 'Description',fixed: 'left',fieldType: 'string',sorter: (a, b) => (a.Description ? a.Description : '').localeCompare(b.Description)}
    ];
    return ColumnModel;
}


export default Entity1GridModel;