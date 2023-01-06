import AppManager from "../AppManager";
import React, { Component } from "react";
import AppSocket from "../AppSocket";
import AppContext from "../AppContext";

class BaseView extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    if (this.props.context) {
      this.setState({ ...this.props.context.body });
    } else {
      if (this.props.autoLoad && this.props.view) {
        this.loadViewModel();
      }
    }
    if (this.props.route) {
      window.document.title = this.props.route.Title;
    }
  }

  async loadViewModel() {
    if (process.env.REACT_APP_SERVERAPP == "false") {
      var viewState = await AppManager.Request(
        this.props.router,
        {},
        "GET",
        {},
        this.props.view
      ).catch((error) => {
        console.log(error);
      });
      this.setState({ ...viewState });
    }
  }

  ViewComponent = (props) => {
    const View = this.props.view
      ? this.props.view.Component
      : this.props.vieweditor.View;
    return <View {...props} />;
  };

  LayoutComponent = (props) => {
    const Layout = this.props.view.Component.Layout;
    return <Layout {...props} />;
  };

  render() {
    if (this.props.autoLoad == true && !this.state) {
      return <div className="viewloading">View loading...</div>;
    }

    const Layout =
      this.props.view && this.props.view.Component
        ? this.props.view.Component.Layout
        : null;
    if (Layout != null) {
      return (
        <this.LayoutComponent
          parent={this}
          viewModel={this.state}
          router={this.props.router}
        >
          <this.ViewComponent
            parent={this}
            viewModel={this.state}
            router={this.props.router}
          />
        </this.LayoutComponent>
      );
    }
    return (
      <this.ViewComponent
        parent={this}
        viewModel={this.state}
        router={this.props.router}
      />
    );
  }
}

export default BaseView;
