import React,{ Component } from "react";



class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.Component = this.props.component;
    }

    render() {
        return <this.Component {...this.props} />
    }
}

export default BaseComponent;