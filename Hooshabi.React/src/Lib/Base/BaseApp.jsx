import React, { Component } from "react";
import AppManager from "../AppManager";
import AppContext from "../AppContext";
import AppSocket from "../AppSocket";

class BaseApp extends Component {
  constructor(props) {
    super(props);
    this.state = { appLoaded: true, socketLoaded: true };
  }

  componentDidMount() {
    this.loadApp();
  }

  loadApp() {
    if (AppContext.IsLogedin() && AppSocket) {
      AppSocket.Instance.connect()
        .then((rs) => {
          this.setState({ socketLoaded: true });
          console.log(AppSocket.Instance);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({ socketLoaded: true });
    }

    // AppManager.Request("api", {}, "POST").then((res) => {
    //   this.PrepareAppContext(res);
    // });
    this.state.appLoaded = true;
    this.PrepareAppContext();
  }

  PrepareAppContext(result) {
    AppManager.prepareAppContext(result);
    this.setState({ appLoaded: true });
  }

  render() {
    if (this.state.appLoaded && this.state.socketLoaded) {
      return <div className="appcontainer">{this.props.children}</div>;
    } else {
      return <div className="baseapploading">Loadingbase...</div>;
    }
  }
}

export default BaseApp;
