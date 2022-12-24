import { Input } from "antd";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import jmoment from "moment-jalaali";
import moment from "moment";
import AppContext from "../AppContext";

export default function CustomDatePicker(props) {
  var val = props.value && typeof props.value == "string" ? props.value : "";
  if (val) {
    console.log(val);
    val = jmoment(val, AppContext.DateFormats.GregorianDateTimeFormat).format(
      AppContext.DateFormats.JalaliDateTimeFormat
    );
  }
  console.log(props);

  if (!val) {
    val = "";
  }

  var format = AppContext.DateFormats.GregorianDateFormat;
  var jformat = AppContext.DateFormats.JalaliDateFormat;
  var plugins = [];
  if (props && !props.DateOnly) {
    plugins = [<TimePicker position="bottom" />];
    format = AppContext.DateFormats.GregorianDateTimeFormat;
    jformat = AppContext.DateFormats.JalaliDateTimeFormat;
  }

  return (
    <DatePicker
      inputClass="customdatepickerinput"
      calendar={persian}
      digits={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      locale={persian_fa}
      name={props.name}
      value={val}
      onChange={(e) => {
        var momentDate = moment(e.toJSON());
        var stringVal = e
          .toString()
          .replace(/[٠-٩۰-۹]/g, (a) => a.charCodeAt(0) & 15);

        var valuString = jmoment(stringVal).format(
          format
        );
        var resultString = jmoment(
          momentDate.format(format),
          format
        ).format(jformat);

        if (momentDate.isValid() && valuString == resultString) {
          var val = momentDate
            .format(jformat)
            .trim();
          if (props.onChange) props.onChange(val);
        }

        //setValue(e.toString());
        var val = jmoment(
          e.toString(),
          jformat
        ).format(format);
        if (props.onChange) props.onChange(val);
      }}
      format={format}
      plugins={plugins}
    />
  );
}
