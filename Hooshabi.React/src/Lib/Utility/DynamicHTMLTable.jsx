import { Component, Fragment } from "react";
import AppContext from "../AppContext";



class DynamicHTMLTable extends Component {
  constructor(props) {
    super(props);
    this.schema =
      this.props.data && this.props.data[0]
        ? this.props.data[0]
        : this.props.data;
    this.getKeys = this.getKeys.bind(this);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
  }

  getKeys = function () {
    return Object.keys(this.schema);
  };

  getHeader = function () {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return (
        <th
          className={
            this.props.dateFields && this.props.dateFields.indexOf(key) > -1
              ? "datefield"
              : ""
          }
          key={key}
        >
          {AppContext.Translate(key, "gridcolumn")}
        </th>
      );
    });
  };

  RenderRow = (props) => {
    return props.keys.map((key, index) => {
      return <td  className={
          this.props.dateFields && this.props.dateFields.indexOf(key) > -1
            ? "datefield"
            : ""
        } key={props.data[key]}>{props.data[key]}</td>;
    });
  };

  getRowsData = function () {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <this.RenderRow key={index} data={row} keys={keys} dateFields={this.props.dateFields} />
        </tr>
      );
    });
  };

  render() {
    return (
      <Fragment>
        <style>
          {`
        .pagect{
            width:100%;
            text-align: right;
            direction: rtl;
        }
        table{
        direction: rtl;
        text-align: right;
        font-size: 12px;
        }
        th {
        background-color: #DADADA;
        color: #000;
        }
        th, td {
        padding: 3px;
        text-align: right;
        width: auto;
        max-width: 180px;
        }
        tr:nth-child(even) {background-color: #f2f2f2;}
        td.datefield{
            direction: ltr;
        }
        `}
        </style>
        <div className="pagect">
          <table>
            <thead>
              <tr>{this.getHeader()}</tr>
            </thead>
            <tbody>{this.getRowsData()}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default DynamicHTMLTable;
