import React, { Component } from "react";
import AppManager from "../AppManager";

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.ComponentModel = {};
        this.id = AppManager.randomId(10);
        if (props.view && props.node && props.view.Components && props.view.Components.filter(t => t.node == props.node).length < 1) {
            props.view.Components.push({ "id": this.id, "node": props.node, "Component": this });
        }
    }

        SetComponentState(data) {
        this.setState(data);
    }

    render() {
        return <div id={this.id} className="componentct"><this.ComponentBody /></div>
    }
}

export default ParentComponent;