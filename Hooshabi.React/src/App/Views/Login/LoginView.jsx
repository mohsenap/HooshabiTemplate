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
  Row,
  Col,
} from "antd";
import React, { Component, Fragment } from "react";
import { BaseComponent, ParentAppView } from "../../../AppImportReferences";
import DefaultLayout from "../../../Layout/Default/DefaultLayout";
import "antd/dist/reset.css";
import "./loginviewcss.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AppManager from "../../../Lib/AppManager";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";

class LoginView extends ParentAppView {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    if (props.parent.props.setShowTopPanel) {
      props.parent.props.setShowTopPanel(false);
    }
    if (props.router && props.router.query && props.router.query.expired) {
      AppManager.removeStorage("Username");
      props.router.navigate("/login", { replace: true });
    }
    this.LoginData = { Username: "", Password: "" };
  }

  static Route = "/Login".toLowerCase();
  static Layout = DefaultLayout;
  static AutoLoad = false;

  componentDidMount() {}

  onFinish = async (values) => {
    if (values.Email && values.Password) {
      var result = await AppManager.Request(
        "api/tokens",
        values,
        "POST",
        {},
        this
      );

      if (result) {
        AppManager.setStorage("Username", values.Email);
        AppManager.setStorage("Token", result.Token);
        AppManager.setStorage("RefreshToken", result.RefreshToken);
        AppManager.setStorage(
          "RefreshTokenExpiryTime",
          result.RefreshTokenExpiryTime
        );
        //}
        if (
          this.props.router &&
          this.props.router &&
          this.props.router.query &&
          this.props.router.query.returnUrl
        ) {
          //this.props.router.navigate(this.props.router.query.returnUrl);
          window.location.href = this.props.router.query.returnUrl;
        } else {
          this.props.router.navigate(`/`);
          //window.location.href = "/";
        }
      } else {
        this.formRef.current.setFieldsValue({ ...values, Password: "" });
        this.setState({ failedMessage: result.message });
      }
    }
  };

  onFinishFailed = (errorInfo) => {};

  ValuesChange(values) {}

  ViewBody = () => {
    return (
      <div className="loginformct">
        <Form
          name="LoginForm"
          className="login-form"
          ref={this.formRef}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          onValuesChange={this.ValuesChange}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <Row justify="center">
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12}>
              <a className="login-form-forgot" href="#">
                Forgot password
              </a>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <label className="failedmsg">{this.state.failedMessage}</label>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

export default LoginView;
