import React, { Component, Fragment } from "react";
import ParentComponent from "../../../Lib/Base/ParentComponent";
import { Form, FormInstance, Modal, Input, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, DatePicker, Row, Col, Space } from 'antd';
import AppManager from "../../../Lib/AppManager";

class ComboBoxDefaultComponent extends ParentComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.Data = [];
    this.LoadComponent();
  }

  async LoadComponent() {
    if (this.props.action) {
      
      this.Data = await AppManager.Request(this.props.view.props.router, {}, 'GET',{}, this.props.view);
      //this.OldData = this.Data;
      
      this.setState({ key: Math.random() });
      // if (this.state.Search) {
      //   this.OnSearch(this.state.Search);
      // }
    }
  }


  ComponentBody = () => {
    
    const options = (this.props.data ? this.props.data : this.Data);
    const valueProperty = (this.props.valueProperty ? this.props.valueProperty : "Value");
    const titleProperty = (this.props.titleProperty ? this.props.titleProperty : "Value");
    const { Option } = Select;
    return <Select
      showSearch
      value="Abraham"
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
      <Option value="lucy">Lucy</Option>
      {
        options && options.length > 0 && options.map(o => {
          return <Option value={o[valueProperty]}>
            {
              titleProperty.split(',').map(p => o[p.trim()]).join(' / ')
            }
          </Option>
        })
      }
    </Select>
  }
}

export default ComboBoxDefaultComponent;