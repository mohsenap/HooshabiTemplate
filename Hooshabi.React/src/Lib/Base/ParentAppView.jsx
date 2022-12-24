import React, { Component } from "react";
import AppManager from "../AppManager";
import 'antd/dist/reset.css';
import AppSocket from "../AppSocket";

class ParentAppView extends Component {
  constructor(props) {
    super(props);
    this.Components = [];
    this.state = {};
    this.viewModel = props.viewModel;
    this.Permissions = {};
    
  }

  GetViewState() {
    var tmp = Object.assign({}, this.state);
    this.Components.forEach((element) => {
      tmp[element.node] = element.Component.state;
    });
    return tmp;
  }

  SetNodeState(nodes) {
    nodes.split(",").map((item) => {
      var cmp = this.Components.find((t) => t.node == item);
      if (cmp != null && this.state[item]) {
        cmp.Component.SetComponentState({ ...this.state[item] });
      }
    });
  }

  render() {
    AppSocket.Instance.commands.setCurrentView(this);
    return (
      <div className="viewroot">
        <this.ViewBody />
      </div>
    );
  }
}

export default ParentAppView;
