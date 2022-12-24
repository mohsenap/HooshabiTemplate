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

const Model1Model = () => {
  return {
    Id: {
      Label: AppContext.Translate("Id", "model"),
      Key: true,
      FieldType: "integer",
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
    UUID1: {
      Label: AppContext.Translate("UUID1", "model"),
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.uuid();
      },
    },
    UUID2: {
      Label: AppContext.Translate("UUID2", "model"),
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.uuid();
      },
    },
    UUID3: {
      Label: AppContext.Translate("UUID3", "model"),
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.uuid();
      },
    },
    UUID4: {
      Label: AppContext.Translate("UUID4", "model"),
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.uuid();
      },
    },
    UUID5: {
      Label: AppContext.Translate("UUID5", "model"),
      FieldType: "uuid",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Input {...props} />;
      },
      Random: () => {
        return faker.datatype.uuid();
      },
    },
    Sting1: {
      Label: AppContext.Translate("Sting1", "model"),
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
    Sting2: {
      Label: AppContext.Translate("Sting2", "model"),
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
    Sting3: {
      Label: AppContext.Translate("Sting3", "model"),
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
    Sting4: {
      Label: AppContext.Translate("Sting4", "model"),
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
    Sting5: {
      Label: AppContext.Translate("Sting5", "model"),
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
    Number1: {
      Label: AppContext.Translate("Number1", "model"),
      FieldType: "integer",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Number2: {
      Label: AppContext.Translate("Number2", "model"),
      FieldType: "integer",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Number3: {
      Label: AppContext.Translate("Number3", "model"),
      FieldType: "integer",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Number4: {
      Label: AppContext.Translate("Number4", "model"),
      FieldType: "integer",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Number5: {
      Label: AppContext.Translate("Number5", "model"),
      FieldType: "integer",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <InputNumber {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Date1: {
      Label: AppContext.Translate("Date1", "model"),
      FieldType: "date",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <DatePicker {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Date2: {
      Label: AppContext.Translate("Date2", "model"),
      FieldType: "date",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <DatePicker {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Date3: {
      Label: AppContext.Translate("Date3", "model"),
      FieldType: "date",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <DatePicker {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Date4: {
      Label: AppContext.Translate("Date4", "model"),
      FieldType: "date",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <DatePicker {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Date5: {
      Label: AppContext.Translate("Date5", "model"),
      FieldType: "date",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <DatePicker {...props} />;
      },
      Random: () => {
        return faker.datatype.number();
      },
    },
    Time1: {
      Label: AppContext.Translate("Time1", "model"),
      FieldType: "time",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <TimePicker {...props} />;
      },
      Random: () => {
        return faker.time.recent("");
      },
    },
    Time2: {
      Label: AppContext.Translate("Time2", "model"),
      FieldType: "time",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <TimePicker {...props} />;
      },
      Random: () => {
        return faker.time.recent("");
      },
    },
    Time3: {
      Label: AppContext.Translate("Time3", "model"),
      FieldType: "time",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <TimePicker {...props} />;
      },
      Random: () => {
        return faker.time.recent("");
      },
    },
    Time4: {
      Label: AppContext.Translate("Time4", "model"),
      FieldType: "time",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <TimePicker {...props} />;
      },
      Random: () => {
        return faker.time.recent("");
      },
    },
    Time5: {
      Label: AppContext.Translate("Time5", "model"),
      FieldType: "time",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <TimePicker {...props} />;
      },
      Random: () => {
        return faker.time.recent("");
      },
    },
    Bool1: {
      Label: AppContext.Translate("Bool1", "model"),
      FieldType: "boolean",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Checkbox {...props} />;
      },
      Random: () => {
        return faker.datatype.boolean();
      },
    },
    Bool2: {
      Label: AppContext.Translate("Bool2", "model"),
      FieldType: "boolean",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Checkbox {...props} />;
      },
      Random: () => {
        return faker.datatype.boolean();
      },
    },
    Bool3: {
      Label: AppContext.Translate("Bool3", "model"),
      FieldType: "boolean",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Checkbox {...props} />;
      },
      Random: () => {
        return faker.datatype.boolean();
      },
    },
    Bool4: {
      Label: AppContext.Translate("Bool4", "model"),
      FieldType: "boolean",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Checkbox {...props} />;
      },
      Random: () => {
        return faker.datatype.boolean();
      },
    },
    Bool5: {
      Label: AppContext.Translate("Bool5", "model"),
      FieldType: "boolean",
      LabelCol: { span: 6 },
      WrapperCol: { span: 18 },
      Rules: [],
      Template: (props) => {
        return <Checkbox {...props} />;
      },
      Random: () => {
        return faker.datatype.boolean();
      },
    },
  };
};

export default Model1Model;
