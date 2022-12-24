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
} from "antd";
import AppManager from "../../../Lib/AppManager";
import { ExclamationCircleOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import momentJalali from "moment-jalaali";
import FileUploaderDefaultComponent from "../../FileUploader/Default/FileUploaderDefaultComponent";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";
const { Option } = Select;
const { Dragger } = Upload;

class FormDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.ValuesChange = this.ValuesChange.bind(this);
    this.OnReset = this.OnReset.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.OnClearForm = this.OnClearForm.bind(this);
    this.OnFinishBody = this.OnFinishBody.bind(this);
    this.LoadCombo = this.LoadCombo.bind(this);
    this.state = props.componentData;

    if (!this.state) {
      this.state = {};
    }
    this.state.IsFormLoaded = false;
    this.state = this.InitState(this.state);
  }

  InitState(state = {}) {
    return {
      FormState: this.props.formState,
      Formkey: this.props.formkey,
      ...state,
    };
  }

  ClearState() {
    var emptyState = Object.assign(
      ...Object.keys(this.state).map((k) => ({ [k]: null }))
    );
    this.setState({
      ...emptyState,
      ...this.InitState(),
      IsFormLoaded: this.state.IsFormLoaded,
    });
  }

  ReloadForm() {
    this.setState({
      IsFormLoaded: false,
    });
  }

  form = React.createRef();

  async LoadComponent() {
    this.state.IsFormLoaded = false;
    this.state.FormState = this.props.formState;
    this.state.Formkey = this.props.formkey;
    this.state.FormDataLoaded = false;
    var result = {};
    
    if (this.props.formkey && this.props.formkey > "0") {
      result = await AppManager.Request(
        this.props.get || this.props.action,
        {},
        "GET"
      );
    }

    //this.ClearState();
    if (this.form.current) this.form.current.resetFields();

    this.defaultValue = result;
    
    Object.keys(result).forEach((element) => {
      if (
        this.formModel[element] &&
        (this.formModel[element].FieldType == "date" ||
          this.formModel[element].FieldType == "time")
      ) {
        this.defaultValue[element] = this.defaultValue[element]
          ? moment(this.defaultValue[element], "HH:mm:ss")
          : null;
      }
    });

    var state = {
      FormState: this.props.formState,
      Formkey: this.props.formkey,
      IsFormLoaded: true,
      FormDataLoaded: true,
    };

    this.SetComponentState({ ...result, ...state });
  }

  SetComponentState(data) {
    Object.keys(data).forEach((element) => {
      if (
        this.formModel[element] &&
        (this.formModel[element].FieldType == "date" ||
          this.formModel[element].FieldType == "time")
      ) {
        if (typeof data[element] == "string")
          data[element] = data[element]
            ? moment(data[element], "HH:mm:ss")
            : null;
      }
    });
    data.DataFormLoaded = true;
    this.setState(data);
    if (this.form.current) this.form.current.setFieldsValue(data);
  }

  async onFinish(values) {
    if (this.props.formState == "DELETE") {
      const { confirm } = Modal;
      var deleteForm = this;
      this.DeleteModal = confirm({
        icon: <ExclamationCircleOutlined />,
        content: AppContext.Translate("AreYouSure", "label"),
        async onOk() {
          
          var result = await deleteForm.OnFinishBody(values);
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else {
      var result = await this.OnFinishBody(values);
    }
  }

  async OnFinishBody(values) {
    debugger;
    if (this.form.current.uploadedFiles) {
      values.uploadedFiles = this.form.current.uploadedFiles.join(";");
    }
    AppManager.EventManager("Form_" + this.props.formState, this);

    Object.keys(values).forEach((item) => {
      if (values[item] && values[item]._i && values[item]._f == "HH:mm:ss") {
        values[item] = values[item]._i;
      } else if (values[item] && values[item]._d && values[item].format) {
        values[item] = values[item].format(
          AppContext.DateFormats.GregorianTimeFormat
        );
      }
    });

    if (this.formModel && this.formModel.BeforeSubmit) {
      var beforeSubmit = this.formModel.BeforeSubmit(this, values);
      if (beforeSubmit == false) return;
    }

    var url = "";
    switch (this.props.formState) {
      case "POST":
        url = this.props.post || this.props.action;
        break;
      case "PUT":
        url = this.props.put || this.props.action;
        break;
      case "GET":
        url = this.props.get || this.props.action;
        break;
      case "DELETE":
        url = this.props.delete || this.props.action;
        break;
      default:
        url = this.props.action;
        break;
    }

    var result = await AppManager.Request(url, values, this.props.formState);
    
    if (this.DeleteModal) {
      this.DeleteModal.destroy();
      this.DeleteModal = null;
      if (
        this.props.node &&
        this.props.view &&
        this.props.view[`${this.props.node}_SaveClicked`]
      ) {
        this.props.view[`${this.props.node}_SaveClicked`](
          this,
          this.props.formState
        );
      }
      return;
    }

   
    this.ClearState();
    this.ReloadForm();
    if (
      this.props.node &&
      this.props.view &&
      this.props.view[`${this.props.node}_SaveClicked`]
    ) {
      this.props.view[`${this.props.node}_SaveClicked`](
        this,
        this.props.formState
      );
    }


  }

  OnClearForm() {
    this.ClearState();
    if (this.form.current) this.form.current.resetFields();
  }

  OnReset() {
    if (Object.keys(this.defaultValue).length > 0)
      this.form.current.setFieldsValue(this.defaultValue);
    else this.form.current.resetFields();
  }

  ValuesChange(values) {}

  LoadCombo(reference) {
    if (this.state[reference.Model + "_" + reference.Field]) return true;
    else {
      if (!this.LoadedLookups) {
        this.LoadedLookups = [];
        this.LoadedLookupsData = {};
      }
      if (this.LoadedLookups.indexOf(reference.Model) < 0) {
        this.LoadedLookups.push(reference.Model);

        var api = reference.API ? reference.API : "lookup";
        AppManager.Request(`/${reference.Model}/${api}`, {}, "GET").then(
          (res) => {
            if (res && res.length > 0) {
              this.LoadedLookupsData[reference.Model] = res;
              var lookupState = {};
              var key = reference.Model + "_" + reference.Field;
              lookupState[key] = res;
              this.setState(lookupState);
            }
          }
        );
      } else if (
        this.LoadedLookupsData &&
        this.LoadedLookupsData[reference.Model]
      ) {
        var lookupState = {};
        var key = reference.Model + "_" + reference.Field;
        lookupState[key] = this.LoadedLookupsData[reference.Model];
        this.setState(lookupState);
      }
      return false;
    }
  }

  ComponentBody = () => {
    this.formModel = this.props.componentModel();
    let j = 0;
    var loading =
      this.state.FormState != this.props.formState ||
      this.state.Formkey != this.props.formkey ||
      !this.state.IsFormLoaded;
    if (loading) {
      this.LoadComponent();
    }
    var columns = this.props.columnNo ? this.props.columnNo : 1;
    return (
      <Form
        style={{ width: "100%" }}
        autocomplete="off"
        name="FormDefaultComponent"
        ref={this.form}
        labelCol={
          this.formModel.FormDef && this.formModel.FormDef.labelCol
            ? this.formModel.FormDef.labelCol
            : { span: 6 }
        }
        wrapperCol={
          this.formModel.FormDef && this.formModel.FormDef.wrapperCol
            ? this.formModel.FormDef.wrapperCol
            : { span: 18 }
        }
        onFinish={this.onFinish}
        defaultValue={this.defaultValue}
        onValuesChange={this.ValuesChange}
        autoComplete="off"
      >
        {loading ||
          (!this.state.FormDataLoaded && (
            <div className="componentloading">LoadingCMP...</div>
          ))}

        {!loading &&
          this.state.FormDataLoaded &&
          Object.keys(this.formModel).map((element) => {
            const config = this.formModel[element];
            if (!config.FieldType) {
              return;
            }
            var disabled = config.Key == true;
            var currentComponent = this;
            var Renderer =
              config.FieldType == "date"
                ? ({ value = {}, onChange }) => {
                    console.log(currentComponent);
                    if (typeof value == "object" && value && value._i) {
                      value = value._i;
                    }
                    return config.Template(element, value, onChange);
                  }
                : config.FieldType == "custom"
                ? ({ value = {}, onChange }) => {
                    return config.Template(
                      element,
                      value,
                      onChange,
                      currentComponent,
                      this
                    );
                  }
                : config.Template({
                    disabled: disabled,
                    component: currentComponent,
                    currentOption: config,
                  });

            var valuePropName =
              config.FieldType == "boolean"
                ? { valuePropName: "checked" }
                : { element };

            return (
              <Form.Item
                hidden={config.Hidden == true}
                key={j++}
                label={config.Label}
                name={element}
                {...valuePropName}
                rules={this.props.formState == "DELETE" ? [] : config.Rules}
              >
                {config.reference && config.reference.Model != "Attachment" ? (
                  <Select
                    showSearch
                    placeholder=""
                    {...(config.reference.Multiple ? { mode: "multiple" } : {})}
                    onChange={(val, item) => {
                      if (config.reference.onChange) {
                        config.reference.onChange(val, item, currentComponent);
                      }
                    }}
                    disabled={config.ReadOnly == true}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state &&
                      config.reference &&
                      this.LoadCombo(config.reference) &&
                      this.state[
                        config.reference.Model + "_" + config.reference.Field
                      ] &&
                      this.state[
                        config.reference.Model + "_" + config.reference.Field
                      ].map((z) => {
                        var val = config.reference.TextRenderer
                          ? config.reference.TextRenderer(z)
                          : z.Name;
                        return (
                          <Option
                            value={
                              config.reference.ValueField
                                ? z[config.reference.ValueField]
                                : z.Id
                            }
                          >
                            {val}
                          </Option>
                        );
                      })}
                  </Select>
                ) : config.reference &&
                  config.reference.Model == "Attachment" ? (
                  <Fragment>
                    <FileUploaderDefaultComponent
                      form={this.form.current}
                      parentComponent={this}
                      field={element}
                      formkey={this.props.formkey}
                      multipleUpload={config.multipleUpload == true}
                      attachmentCategoryId={config.AttachmentCategoryId}
                      editable={config.editable == true}
                      value={this.state[element]}
                      refEntity={config.refEntity}
                      refField={config.refField}
                      accept={config.fileTypes ? config.fileTypes : ""}
                    />
                  </Fragment>
                ) : config.FieldType == "date" ||
                  config.FieldType == "custom" ? (
                  <Renderer component={currentComponent} />
                ) : (
                  Renderer
                )}
              </Form.Item>
            );
          })}
        {!loading && this.state.FormDataLoaded && (
          <Form.Item>
            <Space>
              {this.props.formState == "POST" && (
                <Button type="primary" htmlType="submit">
                  {AppContext.Translate("Save", "label")}
                </Button>
              )}
              {this.props.formState == "PUT" && (
                <Button type="primary" htmlType="submit">
                  {AppContext.Translate("Update", "label")}
                </Button>
              )}
              {this.props.formState == "DELETE" && (
                <Button type="primary" danger htmlType="submit">
                  {AppContext.Translate("Delete", "label")}
                </Button>
              )}
              {this.props.formState == "GET" && (
                <Button htmlType="button" onClick={this.OnReset}>
                  {AppContext.Translate("Reset", "label")}
                </Button>
              )}
            </Space>
          </Form.Item>
        )}
      </Form>
    );
  };
}

export default FormDefaultComponent;
