import {
  Form,
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
  Modal,
} from "antd";
import React, { Component, Fragment } from "react";
import { BaseComponent, ParentAppView } from "../../../AppImportReferences";
import DefaultLayout from "../../../Layout/Default/DefaultLayout";
import 'antd/dist/reset.css';
import "./adminviewcss.scss";

class AdminView extends ParentAppView {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.SaveChanges = this.SaveChanges.bind(this);
    this.ExportToExcel = this.ExportToExcel.bind(this);

    if (!this.state) this.state = {};
  }

  static Route = "/admin".toLowerCase();
  static Layout = DefaultLayout;
  static AutoLoad = true;

  SaveChanges() {
    
  }

  componentDidMount() {}

  ViewBody = () => {
    return (
      <Fragment>
        <div id="excelct" ref={this.myRef}></div>
      </Fragment>
    );
  };
}

export default AdminView;
