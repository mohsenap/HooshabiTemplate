import React, { Component, Fragment } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";
import {
  Form,
  message,
  Typography,
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
import { InboxOutlined } from "@ant-design/icons";
import "./fileuploaderdefaultcomponentcss.scss";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";
const { Dragger } = Upload;
const { Text, Link } = Typography;

class FileUploaderDefaultComponent extends Component {
  constructor(props) {
    super(props);
    this.UploaderProps.onChange = this.UploaderProps.onChange.bind(this);
    this.DeleteAttachment = this.DeleteAttachment.bind(this);
    this.UploaderProps.multiple = props.multipleUpload == true;
    this.state = { Links: [], LinksLoaded: false };
  }

  UploaderProps = {
    name: "files",
    multiple: true,
    accept: this.props.accept,
    action: `${AppManager.APIUrl}upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        if (this.props.form) {
          if (!this.props.form.uploadedFiles)
            this.props.form.uploadedFiles = [];
          var fieldInfo =
            this.props.field +
            "," +
            this.props.value +
            "," +
            info.file.response;
          this.props.form.uploadedFiles.push(fieldInfo);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "removed") {
        if (this.props.form) {
          if (info.file.response && this.props.form.uploadedFiles) {
            var fieldInfo =
              this.props.field +
              "," +
              this.props.value +
              "," +
              info.file.response;
            var index = this.props.form.uploadedFiles.indexOf(fieldInfo);
            if (index > -1) this.props.form.uploadedFiles.splice(index, 1);
          }
        }
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  LoadAttachments() {
    if (!this.state.LinksLoaded) {
      if (!this.props.refEntity || !this.props.refField) return;
      AppManager.Request(
        `/api/attachmentlist/${this.props.refEntity}/${this.props.refField}/${this.props.value}`,
        {},
        "GET",
        {},
        this.props.view
      ).then((res) => {
        this.setState({ LinksLoaded: true, Links: res });
      });
      return false;
    }
    return true;
  }

  async DeleteAttachment(e, attachmentId) {
    var id = attachmentId ? attachmentId : this.props.value;
    var result = await AppManager.Request(
      `api/attachment/DeleteAttachment/${
        this.props.attachmentCategoryId ? this.props.attachmentCategoryId : 0
      }/${id}`,
      {},
      "DELETE"
    );

    if (result > 0) {
      var item = {};
      item[this.props.field] = null;
      this.props.parentComponent.setState({ ...item });
      this.props.form.setFieldsValue({ ...item });
    } else {
    }
  }

  componentDidMount() {
    if (
      this.props.parentComponent &&
      this.props.parentComponent.state.FormState == "POST"
    ) {
      var item = {};
      item[this.props.field] = null;
      this.props.parentComponent.setState({ ...item });
      this.props.form.setFieldsValue({ ...item });
    }
  }

  render = () => {
    if (this.props.form && !this.props.form.uploadedFiles)
      delete this.props.form.uploadedFiles;
    return (
      <Fragment>
        <Dragger {...this.UploaderProps} formkey={this.props.formkey}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {AppContext.Translate("ClickOrDragFileHere", "model")}
          </p>
        </Dragger>
        {this.props.value > 0 && this.props.multipleUpload != true && (
          <>
            <a
              href={
                AppManager.APIUrl +
                "api/attachments/" +
                this.props.value +
                `?rnd=${Date.now()}`
              }
              target="_blank"
            >
              {AppContext.Translate("Attachment", "model")}
            </a>
            &nbsp;&nbsp;&nbsp;{" "}
            {this.props.attachmentCategoryId && (
              <Link onClick={this.DeleteAttachment} target="_blank">
                {AppContext.Translate("DeleteAttachment", "model")}
              </Link>
            )}
          </>
        )}
        {this.props.value &&
          this.props.value.length > 0 &&
          this.props.multipleUpload == true &&
          this.LoadAttachments() &&
          this.state.Links.map((z) => {
            return (
              <div>
                <Link
                  href={
                    AppManager.APIUrl +
                    "api/attachments/" +
                    z.Id +
                    `?rnd=${Date.now()}`
                  }
                  target="_blank"
                >
                  {z.Name}
                </Link>
                {this.props.attachmentCategoryId && (
                  <Link
                    onClick={(e) => {
                      this.DeleteAttachment(e, z.Id);
                    }}
                    target="_blank"
                  >
                    {AppContext.Translate("DeleteAttachment", "model")}
                  </Link>
                )}
              </div>
            );
          })}
      </Fragment>
    );
  };
}

export default FileUploaderDefaultComponent;
