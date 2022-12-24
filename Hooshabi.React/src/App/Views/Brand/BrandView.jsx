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
import FormDefaultComponent from "../../../Component/Form/Default/FormDefaultComponent";
import GridDefaultComponent from "../../../Component/Grid/Default/GridDefaultComponent";
import BrandGridModel from "../../Model/BrandGridModel";
import BrandModel from "../../Model/BrandModel";
import "antd/dist/reset.css";
import "./brandviewcss.scss";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";
import AppManager from "../../../Lib/AppManager";

class View1View extends ParentAppView {
  constructor(props) {
    super(props);
    if (!this.state) this.state = {};
    this.state.ShowForm = false;
    this.state.reloadGrid = 0;
    this.BrandGrid_ActionClicked = this.BrandGrid_ActionClicked.bind(this);
    this.HandleCancelForm = this.HandleCancelForm.bind(this);
  }

  static Layout = DefaultLayout;
  static AutoLoad = false;

  HandleCancelForm = () => {
    this.setState({ FormKey: null });
    this.setState({ ShowForm: false });
    this.GetFormComponent().OnClearForm();
  };

  GetFormComponent() {
    var frm = this.Components.find((z) => z.node == "BrandForm");
    return frm.Component;
  }

  GetGridComponent() {
    var frm = this.Components.find((z) => z.node == "BrandGrid");
    return frm.Component;
  }

  BrandGrid_ActionClicked(cmp, command, item) {
    var title =
      command == "POST"
        ? "New Brand"
        : command == "DELETE"
        ? `${AppContext.Translate("Delete", "label")} ${AppContext.Translate(
            "Brand",
            "EntityName"
          )}`
        : command == "PUT"
        ? `${AppContext.Translate("Edit", "label")} ${AppContext.Translate(
            "Brand",
            "EntityName"
          )}`
        : `${AppContext.Translate("View", "label")} ${AppContext.Translate(
            "Brand",
            "EntityName"
          )}`;
    var data = {
      ShowForm: true,
      FormState: command,
      FormKey: item.Id,
      FormTitle: title,
    };
    this.setState(data);
  }

  async BrandForm_SaveClicked(cmp, formState) {
    this.setState({ ShowForm: false, reloadGrid: Date.now() });
  }

  async BrandGrid_OnNewItem(cmp) {
    var title = `${AppContext.Translate("New", "label")} ${AppContext.Translate(
      "Brand",
      "EntityName"
    )}`;
    var data = {
      ShowForm: true,
      FormState: "POST",
      FormKey: 0,
      FormTitle: title,
    };
    this.setState(data);
  }

  componentDidMount() {
    this.setState({ reloadGrid: Date.now() });
  }

  ViewBody = () => {
    return (
      <Fragment>
        <BaseComponent
          key="1"
          node="BrandGrid"
          view={this}
          component={GridDefaultComponent}
          componentModel={BrandGridModel}
          action={`/api/${AppManager.GetAPIVersion()}/brands/search`}
          method="POST"
          newItem={true}
          reload={this.state.reloadGrid}
        />
        <CustomModalDefaultComponent
          title={this.state.FormTitle}
          visible={this.state.ShowForm}
          onCancel={this.HandleCancelForm}
          footer={[
            <Button key="back" onClick={this.HandleCancelForm}>
              {AppContext.Translate("Cancel", "label")}
            </Button>,
          ]}
        >
          <BaseComponent
            node="BrandForm"
            view={this}
            component={FormDefaultComponent}
            componentModel={BrandModel}
            action={`/api/${AppManager.GetAPIVersion()}/brands/${
              this.state.FormKey
            }`}
            get={`/api/${AppManager.GetAPIVersion()}/brands/${
              this.state.FormKey
            }`}
            post={`/api/${AppManager.GetAPIVersion()}/brands`}
            put={`/api/${AppManager.GetAPIVersion()}/brands/${
              this.state.FormKey
            }`}
            delte={`/api/${AppManager.GetAPIVersion()}/brands/${
              this.state.FormKey
            }`}
            formkey={this.state.FormKey}
            formState={this.state.FormState}
          />
        </CustomModalDefaultComponent>
      </Fragment>
    );
  };
}

export default View1View;
