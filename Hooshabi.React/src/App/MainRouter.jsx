import "./app.scss";
import React, { Fragment, useState } from "react";
import { Component } from "react";

import {
  Form,
  Col,
  Input,
  Layout,
  Menu,
  Row,
  Select,
  Space,
  Button,
  ConfigProvider,
  Typography,
  Image,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import AppManifest from "./AppManifest";
import { useLocation, useNavigate, useParams } from "react-router";
import AppContext from "../Lib/AppContext";
import { Link } from "react-router-dom";
import AppManager from "../Lib/AppManager";

const { Text } = Typography;
const { Option } = Select;

const MainRouter = (props) => {
  const router = {};
  router.location = useLocation();
  router.navigate = useNavigate();
  router.params = useParams();

  const handleClick = (e) => {
    console.log("click ", e);
  };

  function doSomething(value) {
    console.log("doSomething called by child with value:", value);
  }
  const childrenWithProps = React.Children.map(props.children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    // if (React.isValidElement(child)) {
    //   return React.cloneElement(child, { doSomething, setShowTopPanel });
    // }
    return child;
  });
  return (
    <div className="viewroot">
      <ConfigProvider direction="rtl">
        <div className=" mainbody">{childrenWithProps}</div>
      </ConfigProvider>
    </div>
  );
};

export default MainRouter;
