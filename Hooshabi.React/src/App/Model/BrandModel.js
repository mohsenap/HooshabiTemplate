import React, { Component } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  DatePicker,
  TimePicker,
} from "antd";
import { faker } from '@faker-js/faker';
import moment from "moment";
import AppContext from "../../Lib/AppContext";

const BrandModel = () => {
  return {
    Id: {
      Label: AppContext.Translate("Id", "model"),
      Key: true,
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} readOnly={true} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
   
    Name: {
      Label: AppContext.Translate("Name", "model"),
      FieldType: "string",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [{ required: true, message: "This field is required" }],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.string(32);
      },
    },
    Description: {
      Label: AppContext.Translate("Description", "model"),
      FieldType: "string",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.string(32);
      },
    },
   
  };
};

export default BrandModel;
