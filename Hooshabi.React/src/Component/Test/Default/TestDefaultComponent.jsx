import React,{ Component } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";

class TestDefaultComponent extends ParentComponent {
    constructor(props) {
        super(props);
    }

    ComponentBody = () => {
        return <div>Test Component</div>
    }
}

export default TestDefaultComponent;