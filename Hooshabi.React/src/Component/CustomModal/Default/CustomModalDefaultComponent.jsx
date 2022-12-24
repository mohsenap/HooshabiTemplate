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
import "./custommodaldefaultcomponentcss.scss";
import { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

class CustomModalDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      disabled: false,
      bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    };
    this.DraggleRef = React.createRef();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = (e) => {
    this.setState({ visible: false });
  };

  handleCancel = (e) => {
    this.setState({ visible: false });
  };

  onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = this.DraggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }

    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };
  ComponentBody = () => {
    return (
      <Modal
        className={this.props.className}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (this.state.disabled) {
                this.setState({ disabled: false });
              }
            }}
            onMouseOut={() => {
              this.setState({ disabled: true });
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            {this.props.title}
          </div>
        }
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={this.props.footer}
        modalRender={(modal) => (
          <Draggable
            disabled={this.state.disabled}
            bounds={this.state.bounds}
            onStart={(event, uiData) => this.onStart(event, uiData)}
          >
            <div ref={this.DraggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        {this.props.children}
      </Modal>
    );
  };
}

export default CustomModalDefaultComponent;
