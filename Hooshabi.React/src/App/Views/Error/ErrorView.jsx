import { Form, Input, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, DatePicker, Modal } from 'antd';
import React, { Fragment } from 'react';
import { Component } from 'react';
import { BaseComponent, ParentAppView } from '../../../AppImportReferences';
import DefaultLayout from '../../../Layout/Default/DefaultLayout';


class Defaultiew extends ParentAppView {
    constructor(props) {
        super(props);
    }

    static Route = "/Error".toLowerCase();
    static Layout = DefaultLayout;
    static AutoLoad = false;

    ViewBody = () => {
        return <Fragment>
           Error
        </Fragment>
    }
}

export default Defaultiew;