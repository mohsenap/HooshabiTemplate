import React, { Fragment } from "react";
import { Component } from "react";
import BaseLayout from "../../Lib/Base/BaseLayout";
import './layout1css.scss';

class Layout1Layout extends BaseLayout {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="masterlayout">Layout1
            <this.layoutBody />
        </div>
    }

    layoutBody = () => {
        return <Fragment>
            {this.props.children}
        </Fragment>
    }
}

export default Layout1Layout;