import React, { Component, Fragment } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";
import {
  Form,
  FormInstance,
  Modal,
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  DatePicker,
  Row,
  Col,
  Space,
  Transfer,
} from "antd";
import AppManager from "../../../Lib/AppManager";
import "./transferdefaultcomponentcss.scss";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";

class TransferDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.state = { loaded: false, oneWay: false, data: [], targetKeys: [] };
  }

  onChange = (newTargetKeys, direction, moveKeys) => {
    if (this.props.onChange) {
      this.props.onChange(newTargetKeys, direction, moveKeys, this);
    }
    console.log(newTargetKeys, direction, moveKeys);
    //setTargetKeys(newTargetKeys);
  };

  LoadComponentData(parentId) {
    AppManager.Request(
      this.props.load + `/${parentId}`,
      {},
      "GET",
      {},
      this.props.view
    ).then((res) => {
      if (res.Source) {
        this.setState({
          data: res.Source,
          targetKeys: res.Destination.map((t) => t.key),
          loaded: false,
        });
      }
    });
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.state.loaded = true;
      this.LoadComponentData(0);
    }
    if (this.props.formComponent)
      this.props.formComponent.TransferComponent = this;
  }
  ComponentBody = () => {
    return (
      <>
        <Transfer
          rowKey={(record) => {
            return record[this.props.rowKey];
          }}
          titles={this.props.titles}
          className="_appcustomtransfer"
          showSearch
          dataSource={this.state.data}
          targetKeys={this.state.targetKeys}
          onChange={this.onChange}
          render={this.props.textRenderer}
          oneWay={this.state.oneWay}
          locale={{
            itemUnit: AppContext.Translate("item", "label"),
            itemsUnit: AppContext.Translate("item", "label"),
          }}
          pagination={{
            pageSize: 50,
            simple: true,
            showSizeChanger: true,
            showLessItems: true,
          }}
        />
      </>
    );
  };
}

export default TransferDefaultComponent;
