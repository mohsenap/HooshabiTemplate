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
  Descriptions,
} from "antd";
import React, { Component, Fragment } from "react";
import { BaseComponent, ParentAppView } from "../../../AppImportReferences";
import DefaultLayout from "../../../Layout/Default/DefaultLayout";
import "antd/dist/reset.css";
import "./aboutusviewcss.scss";
import AppManager from "../../../Lib/AppManager";
import AppContext from "../../../Lib/AppContext";

class AboutUsView extends ParentAppView {
  constructor(props) {
    super(props);
    if (!this.state) this.state = {};
  }

  static Route = "/Aboutus".toLowerCase();
  static Layout = DefaultLayout;
  static AutoLoad = false;

  componentDidMount() {
    this.LoadSchoolInfo();
  }
  LoadSchoolInfo = async () => {
    var setup = await AppManager.Request("setup/all", {}, "GET", {}, this);
    if (setup && setup.length > 0) {
      this.setState({ Info: setup[0] });
    }
  };
  ViewBody = () => {
    return (
      <Fragment>
        <Descriptions bordered>
          {this.state.Info &&
            Object.keys(this.state.Info)
              .filter((t) => t != "Id")
              .map((el) => {
                return (
                  <Descriptions.Item
                    label={AppContext.Translate(el, "label")}
                    span={24}
                  >
                    {this.state.Info[el]}
                  </Descriptions.Item>
                );
              })}
        </Descriptions>
      </Fragment>
    );
  };
}

export default AboutUsView;
