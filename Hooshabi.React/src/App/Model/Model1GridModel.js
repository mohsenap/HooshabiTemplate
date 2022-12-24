import React from "react";
import moment from "moment";
import AppContext from "../../Lib/AppContext";

const Model1GridModel = () => {
  var ColumnModel = [
    {
      title: AppContext.Translate("Id", "gridcolumn"),
      dataIndex: "Id",
      width: 80,
      key: "Id",
      fixed: "left",
      sorter: (a, b) => a.Id - b.Id,
    },
    {
      title: AppContext.Translate("UUID1", "gridcolumn"),
      dataIndex: "UUID1",
      key: "UUID1",
      sorter: (a, b) => (a.UUID1 ? a.UUID1 : "").localeCompare(b.UUID1),
    },
    {
      title: AppContext.Translate("UUID2", "gridcolumn"),
      dataIndex: "UUID2",
      key: "UUID2",
      sorter: (a, b) => (a.UUID2 ? a.UUID2 : "").localeCompare(b.UUID2),
    },
    {
      title: AppContext.Translate("UUID3", "gridcolumn"),
      dataIndex: "UUID3",
      key: "UUID3",
      sorter: (a, b) => (a.UUID3 ? a.UUID3 : "").localeCompare(b.UUID3),
    },
    {
      title: AppContext.Translate("UUID4", "gridcolumn"),
      dataIndex: "UUID4",
      key: "UUID4",
      sorter: (a, b) => (a.UUID4 ? a.UUID4 : "").localeCompare(b.UUID4),
    },
    {
      title: AppContext.Translate("UUID5", "gridcolumn"),
      dataIndex: "UUID5",
      key: "UUID5",
      sorter: (a, b) => (a.UUID5 ? a.UUID5 : "").localeCompare(b.UUID5),
    },
    {
      title: AppContext.Translate("Sting1", "gridcolumn"),
      dataIndex: "Sting1",
      key: "Sting1",
      sorter: (a, b) => (a.Sting1 ? a.Sting1 : "").localeCompare(b.Sting1),
    },
    {
      title: AppContext.Translate("Sting2", "gridcolumn"),
      dataIndex: "Sting2",
      key: "Sting2",
      sorter: (a, b) => (a.Sting2 ? a.Sting2 : "").localeCompare(b.Sting2),
    },
    {
      title: AppContext.Translate("Sting3", "gridcolumn"),
      dataIndex: "Sting3",
      key: "Sting3",
      sorter: (a, b) => (a.Sting3 ? a.Sting3 : "").localeCompare(b.Sting3),
    },
    {
      title: AppContext.Translate("Sting4", "gridcolumn"),
      dataIndex: "Sting4",
      key: "Sting4",
      sorter: (a, b) => (a.Sting4 ? a.Sting4 : "").localeCompare(b.Sting4),
    },
    {
      title: AppContext.Translate("Sting5", "gridcolumn"),
      dataIndex: "Sting5",
      key: "Sting5",
      sorter: (a, b) => (a.Sting5 ? a.Sting5 : "").localeCompare(b.Sting5),
    },
    {
      title: AppContext.Translate("Number1", "gridcolumn"),
      dataIndex: "Number1",
      key: "Number1",
      sorter: (a, b) => a.Number1 - b.Number1,
    },
    {
      title: AppContext.Translate("Number2", "gridcolumn"),
      dataIndex: "Number2",
      key: "Number2",
      sorter: (a, b) => a.Number2 - b.Number2,
    },
    {
      title: AppContext.Translate("Number3", "gridcolumn"),
      dataIndex: "Number3",
      key: "Number3",
      sorter: (a, b) => a.Number3 - b.Number3,
    },
    {
      title: AppContext.Translate("Number4", "gridcolumn"),
      dataIndex: "Number4",
      key: "Number4",
      sorter: (a, b) => a.Number4 - b.Number4,
    },
    {
      title: AppContext.Translate("Number5", "gridcolumn"),
      dataIndex: "Number5",
      key: "Number5",
      sorter: (a, b) => a.Number5 - b.Number5,
    },
    {
      title: AppContext.Translate("Date1", "gridcolumn"),
      dataIndex: "Date1",
      key: "Date1",
      width: "120",
      sorter: (a, b) => moment(a.Date1).unix() - moment(b.Date1).unix(),
    },
    {
      title: AppContext.Translate("Date2", "gridcolumn"),
      dataIndex: "Date2",
      key: "Date2",
      width: "120",
      sorter: (a, b) => moment(a.Date2).unix() - moment(b.Date2).unix(),
    },
    {
      title: AppContext.Translate("Date3", "gridcolumn"),
      dataIndex: "Date3",
      key: "Date3",
      width: "120",
      sorter: (a, b) => moment(a.Date3).unix() - moment(b.Date3).unix(),
    },
    {
      title: AppContext.Translate("Date4", "gridcolumn"),
      dataIndex: "Date4",
      key: "Date4",
      width: "120",
      sorter: (a, b) => moment(a.Date4).unix() - moment(b.Date4).unix(),
    },
    {
      title: AppContext.Translate("Date5", "gridcolumn"),
      dataIndex: "Date5",
      key: "Date5",
      width: "120",
      sorter: (a, b) => moment(a.Date5).unix() - moment(b.Date5).unix(),
    },
    {
      title: AppContext.Translate("Time1", "gridcolumn"),
      dataIndex: "Time1",
      key: "Time1",
      sorter: (a, b) => (a.Time1 ? a.Time1 : "").localeCompare(b.Time1),
    },
    {
      title: AppContext.Translate("Time2", "gridcolumn"),
      dataIndex: "Time2",
      key: "Time2",
      sorter: (a, b) => (a.Time2 ? a.Time2 : "").localeCompare(b.Time2),
    },
    {
      title: AppContext.Translate("Time3", "gridcolumn"),
      dataIndex: "Time3",
      key: "Time3",
      sorter: (a, b) => (a.Time3 ? a.Time3 : "").localeCompare(b.Time3),
    },
    {
      title: AppContext.Translate("Time4", "gridcolumn"),
      dataIndex: "Time4",
      key: "Tim4",
      sorter: (a, b) => (a.Time4 ? a.Time4 : "").localeCompare(b.Time4),
    },
    {
      title: AppContext.Translate("Time5", "gridcolumn"),
      dataIndex: "Time5",
      key: "Time5",
      sorter: (a, b) => (a.Time5 ? a.Time5 : "").localeCompare(b.Time5),
    },
    {
      title: AppContext.Translate("Bool1", "gridcolumn"),
      dataIndex: "Bool1",
      key: "Bool1",
      sorter: (a, b) => a.Bool1 - b.Bool1,
    },
    {
      title: AppContext.Translate("Bool2", "gridcolumn"),
      dataIndex: "Bool2",
      key: "Bool2",
      sorter: (a, b) => a.Bool2 - b.Bool2,
    },
    {
      title: AppContext.Translate("Bool3", "gridcolumn"),
      dataIndex: "Bool3",
      key: "Bool3",
      sorter: (a, b) => a.Bool3 - b.Bool3,
    },
    {
      title: AppContext.Translate("Bool4", "gridcolumn"),
      dataIndex: "Bool4",
      key: "Bool4",
      sorter: (a, b) => a.Bool4 - b.Bool4,
    },
    {
      title: AppContext.Translate("Bool5", "gridcolumn"),
      dataIndex: "Bool5",
      key: "Bool5",
      sorter: (a, b) => a.Bool5 - b.Bool5,
    },
  ];
  return ColumnModel;
};

export default Model1GridModel;
