import React from "react";
import { Component } from "react";

class BaseLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="layoutroot">
            <this.LayoutBody />
        </div>
    }
}

export default BaseLayout;