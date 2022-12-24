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
  Modal,
} from "antd";
import React, { Fragment } from "react";
import { Component } from "react";
import { BaseComponent, ParentAppView } from "../../../AppImportReferences";

import { Link } from "react-router-dom";
import AppContext from "../../../Lib/AppContext";
import CustomModalDefaultComponent from "../../../Component/CustomModal/Default/CustomModalDefaultComponent";

class DefaultView extends ParentAppView {
  constructor(props) {
    super(props);
    this.HideWrapperMenuHeader = true;
    if(props.parent.props.setShowTopPanel){
      props.parent.props.setShowTopPanel(false);
    }
    
  }

  static Layout = null;
  static AutoLoad = false;
  static DefaultRuter = null;
  

  componentDidMount() {}

  ConnectToPeer() {
    window.connectToPeer();
    console.log(process.env.PUBLIC_URL);
  }

  ViewBody = () => {
    
    
    return (
      <>
        
      </>
    );
  };
}

export default DefaultView;
