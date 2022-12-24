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
import Model1GridModel from "../../Model/Model1GridModel";
import Model1Model from "../../Model/Model1Model";
import 'antd/dist/reset.css';
import "./view1viewcss.scss";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";

class View1View extends ParentAppView {
  constructor(props) {
    super(props);
    if (!this.state) this.state = {};
    this.state.ShowForm = false;
    this.state.reloadGrid = Date.now();
    this.Entity1Grid_ActionClicked = this.Entity1Grid_ActionClicked.bind(this);
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
    var frm = this.Components.find((z) => z.node == "Entity1Form");
    return frm.Component;
  }

  GetGridComponent() {
    var frm = this.Components.find((z) => z.node == "Entity1Grid");
    return frm.Component;
  }

  Entity1Grid_ActionClicked(cmp, command, item) {
    var title =
      command == "POST"
        ? "New Entity1"
        : command == "DELETE"
        ? `${AppContext.Translate("Delete", "label")} ${AppContext.Translate(
            "Entity1",
            "EntityName"
          )}`
        : command == "PUT"
        ? `${AppContext.Translate("Edit", "label")} ${AppContext.Translate(
            "Entity1",
            "EntityName"
          )}`
        : `${AppContext.Translate("View", "label")} ${AppContext.Translate(
            "Entity1",
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

  async Entity1Form_SaveClicked(cmp, formState) {
    this.setState({ ShowForm: false, reloadGrid: Date.now() });
  }

  async Entity1Grid_OnNewItem(cmp) {
    var title = `${AppContext.Translate("New", "label")} ${AppContext.Translate(
      "Entity1",
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

  ViewBody = () => {
    return (
      <Fragment>
        <BaseComponent
          key="1"
          node="Entity1Grid"
          view={this}
          component={GridDefaultComponent}
          componentModel={Model1GridModel}
          action={"/view1/all"}
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
            node="Entity1Form"
            view={this}
            component={FormDefaultComponent}
            componentModel={Model1Model}
            action={`/view1/rec/${this.state.FormKey}`}
            formkey={this.state.FormKey}
            formState={this.state.FormState}
          />
        </CustomModalDefaultComponent>
      </Fragment>
    );
  };
}

export default View1View;
