import React, { Component, Fragment } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";
import { Form, FormInstance, Modal, Input, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, DatePicker, Row, Col, Space } from 'antd';
import AppManager from "../../../Lib/AppManager";
import './component1defaultcomponentcss.scss';

class Component1DefaultComponent extends ParentComponent {
    constructor(props) {
        super(props);
    }

    ComponentBody = () => {
        return <Fragment>Component1</Fragment>
    }
}

export default Component1DefaultComponent;