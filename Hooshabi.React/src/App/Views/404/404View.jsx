import { Form, Input, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, DatePicker, Modal } from 'antd';
import React, { Fragment } from 'react';
import { Component } from 'react';
import { BaseComponent, ParentAppView } from '../../../AppImportReferences';
import PersonModel from '../../Model/PersonModel';
import DefaultLayout from '../../../Layout/Default/DefaultLayout';
import FormDefaultComponent from '../../../Component/Form/Default/FormDefaultComponent';
import TestDefaultComponent from '../../../Component/Test/Default/TestDefaultComponent';
import GridDefaultComponent from '../../../Component/Grid/Default/GridDefaultComponent';
import PersonGridModel from '../../Model/PersonGridModel';
import ComboBoxDefaultComponent from '../../../Component/ComboBox/Default/ComboBoxDefaultComponent';


class Defaultiew extends ParentAppView {
    constructor(props) {
        super(props);
        if (!this.state)
            this.state = {};
        this.state.ShowForm = false;
        this.PersonGrid_ActionClicked = this.PersonGrid_ActionClicked.bind(this);
        this.HandleCancelForm = this.HandleCancelForm.bind(this);
    }

    static Route = "/";
    static Layout = DefaultLayout;
    static AutoLoad = false;

    HandleCancelForm = () => {
        this.setState({ FormKey: null });
        this.setState({ ShowForm: false });
        this.GetFormComponent().OnClearForm();
    }

    GetFormComponent() {
        var frm = this.Components.find(z => z.node == "PersonForm");
        return frm.Component;
    }

    GetGridComponent() {
        var frm = this.Components.find(z => z.node == "PersonGrid");
        return frm.Component;
    }

    PersonGrid_ActionClicked(cmp, command, item) {
        var title = command == "POST" ? "New Person" : (command == "DELETE" ? "Delete Person" : (command == "PUT" ? "Edit Person" : "VIEW Person"));
        var data = { ShowForm: true, FormState: command, FormKey: item.Id, FormTitle: title };
        this.setState(data);
    }

    async PersonForm_SaveClicked(cmp, formState) {
        this.setState({ ShowForm: false });
        
        this.GetGridComponent().LoadComponent();
    }

    async PersonGrid_OnNewItem(cmp) {
        var title = "New Person";
        var data = { ShowForm: true, FormState: "POST", FormKey: 0, FormTitle: title };
        this.setState(data);
    }

    ViewBody = () => {
        return <Fragment>
            <BaseComponent key="1" node="PersonGrid" view={this} component={GridDefaultComponent} componentModel={PersonGridModel} action="PersonGrid" newItem={true} />
            <Modal title={this.state.FormTitle} visible={this.state.ShowForm} onCancel={this.HandleCancelForm}
                footer={[
                    <Button key="back" onClick={this.HandleCancelForm}>
                        Cancel
                    </Button>
                ]} >
                <BaseComponent view={this} component={FormDefaultComponent} componentModel={PersonModel} node="PersonForm" action="PersonForm" formkey={this.state.FormKey} formState={this.state.FormState} stamp={Date.now()} />
            </Modal>
            {/* <BaseComponent key="3" node="PersonLookup" view={this} component={ComboBoxDefaultComponent} action="PersonLookup" valueProperty="Id" titleProperty="FirstName, LastName" /> */}
        </Fragment>
    }
}

export default Defaultiew;