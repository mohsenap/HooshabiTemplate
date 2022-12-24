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

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "./customeditordefaultcomponentcss.scss";

class CustomEditorDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.editorContainer = React.createRef();
  }

  componentDidMount() {
    var editor = this.editorContainer.current;
    import("quill").then((module, w) => {
      this.Quill = module.default;
      if (!editor.attributes["loaded"]) {
        editor.attributes["loaded"] = true;
        editor.innerHTML = "";
        var selector = "#" + editor.id;
        if (window.document.getElementById(editor.id)) {
          this.quillContainer = new this.Quill("#" + editor.id, {
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }], // custom button values
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }], // superscript/subscript
                [{ indent: "-1" }, { indent: "+1" }, { align: [] }], // outdent/indent
                [{ direction: "rtl" }], // text direction

                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                [{ font: [] }],

                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                ["link", "image", "video"],
                ["clean"],
              ],
            },
            placeholder: "Compose an epic...",
            theme: "snow", // or 'bubble'
          });

          var self = this;
          if (
            self.props.value &&
            typeof self.props.value == "string" &&
            editor.querySelector(".ql-editor")
          ) {
            editor.querySelector(".ql-editor").innerHTML = self.props.value;
          }

          if (this.quillContainer.on)
            this.quillContainer.on(
              "text-change",
              function (delta, oldDelta, source) {
                if (source == "api") {
                  console.log("An API call triggered this change.");
                } else if (source == "user") {
                  self.props.onChange(
                    editor.querySelector(".ql-editor").innerHTML
                  );
                  console.log(editor.innerHTML);
                }
              }
            );
        }
      }
    });
  }

  ComponentBody = () => {
    this.cmpId = `myeditor${Date.now()}`;
    return (
      <>
        <div id={this.cmpId} ref={this.editorContainer}></div>
      </>
    );
  };
}

export default CustomEditorDefaultComponent;
