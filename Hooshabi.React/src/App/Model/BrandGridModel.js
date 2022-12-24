import React from "react";
import moment from "moment";
import AppContext from "../../Lib/AppContext";

const BrandGridModel = () => {
  var ColumnModel = [
    {
      title: AppContext.Translate("Id", "gridcolumn"),
      dataIndex: "Id",
      key: "Id",
      sorter: (a, b) => (a.Id ? a.Id : "").localeCompare(b.Id),
    },
    {
      title: AppContext.Translate("Name", "gridcolumn"),
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => (a.Name ? a.Name : "").localeCompare(b.Name),
    },
    {
      title: AppContext.Translate("Description", "gridcolumn"),
      dataIndex: "Description",
      key: "Description",
      sorter: (a, b) => (a.Description ? a.Description : "").localeCompare(b.Description),
    }
  ];
  return ColumnModel;
};

export default BrandGridModel;
