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
  TreeSelect,
} from "antd";
import AppManager from "../../../Lib/AppManager";
import "./treelookupdefaultcomponentcss.scss";
import AppContext from "../../../Lib/AppContext";

class TreeLookupDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.state = {
      AllNodes: [],
      ValuNodes: props.singleSelect ? [props.value] : (props.value && !props.value.length? [] : props.value),
    };
    
  }

  componentDidMount() {
    if (!this.IsLoading) {
      this.IsLoading = true;
      
      AppManager.Request(this.props.url, {}, "GET")
        .then((res) => {
          this.IsLoading = false;
          if (!res) res = [];
          this.setState({
            AllNodes: res,
            ValuNodes: this.props.singleSelect
              ? [this.props.value]
              : (this.props.value && !this.props.value.length? [] : this.props.value),
          });
        })
        .catch((err) => {
          this.IsLoading = false;
        });
    }
  }
  ComponentBody = () => {
    
    const { SHOW_PARENT } = TreeSelect;
    const tProps = {
      treeData: this.state.AllNodes,
      value: this.state.ValuNodes,
      onChange: (newValue) => {
        this.setState({ ValuNodes: newValue });
        this.props.onChange(this.props.singleSelect ? newValue[0] : newValue);
      },
      filterTreeNode: (search, item) => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
      },
      treeCheckable: this.props.singleSelect? false: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: AppContext.Translate("SelectClassOrStudents", "label"),
      style: {
        width: "100%",
      },
    };
    return <TreeSelect showSearch allowClear {...tProps} />;
  };
}

export default TreeLookupDefaultComponent;
