import React, { Component } from "react";
import { Form, Input, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, DatePicker, TimePicker } from 'antd';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import AppContext from "../../Lib/AppContext";

const Entity1Model = () => {
    return {
   
    "Id": { "Label": AppContext.Translate("Id", "model"),"FieldType":"int","labelCol": { span: 6 },"wrapperCol": { span: 18 },"Rules": [],"Template": () => { return <InputNumber /> },"Random":   () => { return faker.datatype.string(6); },},
"Name": { "Label": AppContext.Translate("Name", "model"),"FieldType":"string","labelCol": { span: 6 },"wrapperCol": { span: 18 },"Rules": [{ "required": true, "message": "This field is required" }],"Template": () => { return <Input /> },"Random":   () => { return faker.datatype.string(6); },},
"Description": { "Label": AppContext.Translate("Description", "model"),"FieldType":"string","labelCol": { span: 6 },"wrapperCol": { span: 18 },"Rules": [{ "required": true, "message": "This field is required" }],"Template": () => { return <Input /> },"Random":   () => { return faker.datatype.string(6); },}
    
}
}


export default Entity1Model;