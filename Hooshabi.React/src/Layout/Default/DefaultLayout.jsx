import { PageHeader } from "antd";
import React, { Fragment } from "react";
import { Component } from "react";
import AppContext from "../../Lib/AppContext";
import BaseLayout from "../../Lib/Base/BaseLayout";

class DefaultLayout extends BaseLayout {
  constructor(props) {
    super(props);
  }

  LayoutBody = () => {
    return <div className="viewlayout">{this.props.children}</div>;
  };
}

export default DefaultLayout;
