import React, { Component } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";
import {
  Table,
  Menu,
  Dropdown,
  Button,
  Row,
  Col,
  Space,
  Radio,
  List,
} from "antd";
import {
  DownOutlined,
  CloseSquareOutlined,
  PlusSquareOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  ContainerOutlined,
  TableOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import AppManager from "../../../Lib/AppManager";
import Search from "antd/lib/input/Search";
import * as XLSX from "xlsx";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";
import { renderToString } from "react-dom/server";
import DynamicHTMLTable from "../../../Lib/Utility/DynamicHTMLTable";
import jmoment from "moment-jalaali";

class GridDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.ActionMenu = this.ActionMenu.bind(this);
    this.OnSearch = this.OnSearch.bind(this);
    this.OnNewItem = this.OnNewItem.bind(this);
    this.ExportToExcel = this.ExportToExcel.bind(this);
    this.ExportToPDF = this.ExportToPDF.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.state = { layoutMode: "grid" };
    this.Data = [];
    this.reload = 0;
    var modelFields = this.props.componentModel();
    var topActions = modelFields.filter((t) => t.topActions);
    const gridMenu = (
      <Menu>
        <Menu.Item
          key="1"
          icon={<PlusSquareOutlined />}
          onClick={this.OnNewItem}
        >
          {AppContext.Translate("New", "label")}
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<FileExcelOutlined />}
          onClick={this.ExportToExcel}
        >
          {AppContext.Translate("ExportToExcel", "label")}
        </Menu.Item>
        <Menu.Item
          key="2"
          danger
          icon={<FilePdfOutlined />}
          onClick={this.ExportToPDF}
        >
          {AppContext.Translate("ExportToPDF", "label")}
        </Menu.Item>
        {topActions &&
          topActions.map((t) => {
            return (
              <Menu.Item
                key={Date.now()}
                onClick={(e) => {
                  t.onSelect(this);
                }}
              >
                {t.title}
              </Menu.Item>
            );
          })}
      </Menu>
    );

    var actions = modelFields.filter((t) => t.actionMenu);
    var customActionMenu = modelFields.find((t) => t.customActionMenu);
    this.ColumnModel = this.props.componentModel
      ? modelFields
          .filter((t) => t.dataIndex)
          .map((t) => {
            if (t.render) {
              var tempRender = t.render;
              t.render = (item, record, index) => {
                return tempRender(item, record, index, this);
              };
            }
            return t;
          })
      : null;

    if (this.ColumnModel.find((z) => z && z.id == "ActionMenu") == null) {
      this.ColumnModel.push({
        id: "ActionMenu",
        title: () => {
          return this.props.newItem ? (
            <Dropdown overlay={gridMenu}>
              <Button>
                {AppContext.Translate("Options", "label")} <DownOutlined />
              </Button>
            </Dropdown>
          ) : (
            AppContext.Translate("Options", "label")
          );
        },
        key: "operation",
        fixed: "right",
        width: 100,
        render: (item, record, index) => {
          if (customActionMenu == null) {
            const menu = (
              <Menu>
                <Menu.Item
                  key="1"
                  icon={<ContainerOutlined />}
                  onClick={(e) => {
                    this.ActionMenu(e, "GET", item);
                  }}
                >
                  {AppContext.Translate("View", "label")}
                </Menu.Item>
                <Menu.Item
                  key="1"
                  icon={<ContainerOutlined />}
                  onClick={(e) => {
                    this.ActionMenu(e, "PUT", item);
                  }}
                >
                  {AppContext.Translate("Edit", "label")}
                </Menu.Item>
                <Menu.Item
                  key="2"
                  danger
                  icon={<CloseSquareOutlined />}
                  onClick={(e) => {
                    this.ActionMenu(e, "DELETE", item);
                  }}
                >
                  {AppContext.Translate("Delete", "label")}
                </Menu.Item>
                {actions &&
                  actions.map((t) => {
                    return (
                      <Menu.Item
                        key={Date.now()}
                        onClick={(e) => {
                          t.onSelectItem(this, item, record, index);
                        }}
                      >
                        {t.title}
                      </Menu.Item>
                    );
                  })}
              </Menu>
            );
            return (
              <Dropdown overlay={menu}>
                <Button>
                  {AppContext.Translate("Options", "label")} <DownOutlined />
                </Button>
              </Dropdown>
            );
          } else {
            return customActionMenu.render(item, record, index, this);
          }
        },
      });
    }
  }

  componentDidMount() {
    
    if (this.props.reload > 0 || this.props.componentData) {
      console.log(222);
      this.LoadComponent();
    }
  }

  async LoadComponent() {
    if (this.reload > 1) {
      this.reload = this.props.reload;
    } else {
      this.reload = Date.now();
    }

    if (this.props.componentData) {
      this.Data = this.props.componentData;
    } else if (this.props.componentModel && this.props.action) {
      var result = await AppManager.Request(
        this.props.action,
        {},
        this.props.method
      );
      this.Data = result.Data;
    }
    if (!this.Data || !this.Data.length) this.Data = [];
    this.OldData = this.Data;
    this.setState({ key: Math.random(), data: this.Data });
    if (this.state && this.state.Search) {
      this.OnSearch(this.state.Search);
    }
  }

  OnNewItem() {
    if (
      this.props.node &&
      this.props.view &&
      this.props.view[`${this.props.node}_OnNewItem`]
    ) {
      this.props.view[`${this.props.node}_OnNewItem`](this);
    }
  }

  ExportToExcel() {
    if (this.Data.length > 0) {
      var workbook = XLSX.utils.book_new();
      var gridData = XLSX.utils.json_to_sheet(this.Data);
      XLSX.utils.book_append_sheet(workbook, gridData, "ExportData");
      XLSX.writeFile(workbook, `Data_${Date.now()}.xlsx`);
    }
  }

  ExportToPDF() {
    if (this.Data.length > 0) {
      var cols = this.ColumnModel.map((t) => t.dataIndex).filter(
        (t) => t && t.length > 0
      );
      var dataItem = {};
      cols.map((t) => {
        dataItem[t] = "";
      });
      var dateFields = [];
      var data = this.Data.map((t) => {
        var item = Object.assign({}, dataItem);
        Object.keys(item).forEach((key) => {
          var isDtaeField = this.ColumnModel.find(
            (u) => u.dataIndex == key && u.fieldType == "date"
          );
          if (isDtaeField) {
            try {
              var val = jmoment(
                t[key],
                AppContext.DateFormats.GregorianDateTimeFormat
              ).format(AppContext.DateFormats.JalaliDateTimeFormat);
              item[key] = val;
              dateFields.push(key);
            } catch (error) {}
          } else item[key] = t[key];
        });
        return item;
      });
      var html = renderToString(
        <DynamicHTMLTable data={data} dateFields={dateFields} />
      );

      AppManager.Request(
        "api/exporthtmltopdf",
        {
          html: html,
        },
        "POST",
        { responseType: "blob" }
      ).then((res) => {
        AppManager.DownloadBlob(`data_${Date.now()}.pdf`, res);
      });
    }
  }

  ActionMenu(e, command, item) {
    if (
      this.props.node &&
      this.props.view &&
      this.props.view[`${this.props.node}_ActionClicked`]
    ) {
      this.props.view[`${this.props.node}_ActionClicked`](this, command, item);
    } else if (
      this.props.node &&
      this.props.view &&
      this.props.node.indexOf("_") > -1
    ) {
      var node = this.props.node.substring(0, this.props.node.indexOf("_"));
      if (this.props.view[`${node}_ActionClicked`]) {
        this.props.view[`${node}_ActionClicked`](this, command, item);
      }
    }
  }

  OnSearch(value) {
    if (value && value.length > 0) {
      this.Data = this.OldData.filter((z) => {
        var result = false;
        Object.keys(z).forEach((element) => {
          if (
            z[element] &&
            z[element].toString().toLowerCase().indexOf(value.toLowerCase()) >
              -1
          ) {
            result = true;
            return;
          }
        });
        return result;
      });
    } else {
      this.Data = this.OldData;
    }
    this.setState({ key: Math.random(), Search: value, data: this.Data });
    if (
      this.props.node &&
      this.props.view &&
      this.props.view[`${this.props.node}_AfterSearch`]
    ) {
      this.props.view[`${this.props.node}_AfterSearch`](this, value);
    }
  }

  handleLayoutChange(e) {
    this.setState({ layoutMode: e.target.value });
  }

  ComponentBody = () => {
    if (
      this.props.componentModel &&
      this.props.componentModel.Data &&
      this.props.componentModel.Data.length > 0
    ) {
      this.Data = this.props.componentModel.Data;
      this.OldData = this.Data;
    }
    
    if (this.props.reload > this.reload) {
      this.LoadComponent();
    }

    return (
      <div className="gridouterct">
        {!this.props.hideToolbar && (
          <div className="gridtopbar">
            <Row justify="start">
              <Col span={12}>
                <Space>
                  <Radio.Group
                    value={
                      this.state.layoutMode == "grid" &&
                      !AppManager.IsMobileSize()
                        ? "grid"
                        : "list"
                    }
                    onChange={this.handleLayoutChange}
                  >
                    <Radio.Button value="grid">
                      <TableOutlined title="Grid" />
                    </Radio.Button>
                    <Radio.Button value="list">
                      <DatabaseOutlined title="List" />
                    </Radio.Button>
                  </Radio.Group>
                  <Search
                    allowClear
                    placeholder="Search inside"
                    value={this.state.Search}
                    onChange={(e) => {
                      this.setState({ Search: e.target.value });
                    }}
                    onSearch={this.OnSearch}
                    enterButton
                  />
                </Space>
              </Col>
            </Row>
          </div>
        )}
        {this.state.layoutMode == "grid" && !AppManager.IsMobileSize() ? (
          <Table columns={this.ColumnModel} dataSource={this.state.data} />
        ) : (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 20,
            }}
            dataSource={this.state.data}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={(item) => (
              <List.Item key={item.Id}>
                {Object.keys(item)
                  .filter(
                    (u) =>
                      this.ColumnModel.find((t) => t.dataIndex == u) != null
                  )
                  .map((t) => {
                    return (
                      <div className="gridlistitem">
                        <label className="gridlistitemlabel">
                          {AppContext.Translate(t, "gridcolumn")}:
                        </label>
                        <span className="gridlistitemvalue">{item[t]}</span>
                      </div>
                    );
                  })}
              </List.Item>
            )}
          />
        )}
      </div>
    );
  };
}

export default GridDefaultComponent;
