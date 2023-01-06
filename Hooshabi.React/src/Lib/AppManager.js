import { notification } from "antd";
import Axios from "axios";
import { faker } from "@faker-js/faker";
import AppContext from "./AppContext";
import jmoment from "moment-jalaali";

class AppManager {
  constructor() {
    var url = process.env.REACT_APP_APIURL;
    this.APIUrl = url[url.length - 1] == "/" ? url : url + "/";
    jmoment().format(AppContext.DateFormats.JalaliDateTimeFormat);
  }

  toJalaliDateFormat(date) {
    if (date) {
      date = jmoment(
        date,
        AppContext.DateFormats.GregorianDateTimeFormat
      ).format(AppContext.DateFormats.JalaliDateTimeFormat);
    }
    return date;
  }

  toJalaliDateOnlyFormat(date) {
    if (date) {
      date = jmoment(
        date,
        AppContext.DateFormats.GregorianDateTimeFormat
      ).format(AppContext.DateFormats.JalaliDateFormat);
    }
    return date;
  }

  makeEmptyArray(length) {
    return [...Array(length)];
  }

  randomId(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  client = Axios.create({
    baseURL: this.APIUrl,
    headers: {
      "Content-Type": "application/json",
      clientapprequest: "1",
    },
    withCredentials: false,
  });

  appComponents = [];

  removeStorage(key) {
    localStorage.removeItem(key);
  }

  removeUserStorage() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Token");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("RefreshTokenExpiryTime");

  }

  GetAPIVersion() {
    return process.env.REACT_APP_APIVERSION;
  }
  async Request(router, data, method, options, view) {
    debugger;
    var response = {};
    var url = "";
    if (typeof router != "string") {
      url = this.APIUrl + router.location.pathname.substring(1);
    } else {
      url = this.APIUrl + (router[0] == "/" ? router.substring(1) : router);
    }

    //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },responseType: 'blob'
    var config = {
      headers: {
        Accept: "application/json",
        tenant: "root",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        clientapprequest: 1,
      },
    };
    if (options) Object.assign(config, options);

    config.headers.authorization = `Bearer ` + AppContext.GetToken();

    switch (method) {
      case "GET":
        config.method = "GET";
        if (data && Object.keys(data).length > 0) config.params = data;
        response = await this.client.get(url, config).catch((error) => {
          this.logoutUnAuthorizeRequest(error, view);
          console.log(error);
          this.ShowNotify(
            error.stack ? error.stack : error,
            this.NotifyType.Error
          );
        });
        break;
      case "POST":
        response = await this.client.post(url, data, config).catch((error) => {
          this.logoutUnAuthorizeRequest(error, view);
          console.log(error);
          this.ShowNotify(
            error.stack ? error.stack : error,
            this.NotifyType.Error
          );
        });
        break;
      case "PUT":
        response = await this.client.put(url, data, config).catch((error) => {
          this.logoutUnAuthorizeRequest(error, view);
          console.log(error);
          this.ShowNotify(
            error.stack ? error.stack : error,
            this.NotifyType.Error
          );
        });
        break;
      case "DELETE":
        config.data = data;
        response = await this.client.delete(url, config).catch((error) => {
          this.logoutUnAuthorizeRequest(error, view);
          console.log(error);
          this.ShowNotify(
            error.stack ? error.stack : error,
            this.NotifyType.Error
          );
        });
        break;
      default:
        return false;
    }
    return this.processResponse(router, response, method);
  }

  logoutUnAuthorizeRequest(error, view){
    debugger;
    if(error.response.status == 401){
      if(view && view.props && view.props.router){
        view.props.router.navigate("/logout", { replace: true });
        return;
      }
    }
  }

  ShowNotify(msg, type) {
    var title = "Notice";
    switch (type) {
      case this.NotifyType.Success:
        title = AppContext.Translate("Success", "label");
        break;
      case this.NotifyType.Info:
        title = AppContext.Translate("Info", "label");
        break;
      case this.NotifyType.Warning:
        title = AppContext.Translate("Warning", "label");
        break;
      case this.NotifyType.Error:
        title = AppContext.Translate("Error", "label");
        break;
      default:
        break;
    }
    var notify = {
      message: title,
      description: msg,
    };
    if (type == this.NotifyType.Error) notify.duration = 0;
    notification[type](notify);
  }

  NotifyType = {
    Success: "success",
    Info: "info",
    Warning: "warning",
    Error: "error",
  };

  async PostAction(router, postData) {
    const url = router.location.pathname + router.location.search;
    const response = await this.client.post(url, postData);
    return response.data ? response.data : null;
  }

  generateDataForModel = (model, count, array = true) => {
    if (model) {
      if (!array) {
        var output = {};
        Object.keys(output).map((item, j) => {
          output[item] = model[item]();
        });
        return output;
      } else {
        return [...Array(count)].map((item, j) => {
          var output = {};
          Object.keys(model).map((item, j) => {
            output[item] = model[item].random();
          });
          return output;
        });
      }
    }
    return null;
  };

  generateRandomDataForModel = (model, count, array = true) => {
    if (model) {
      var result = {};
      Object.keys(model).map((item, j) => {
        switch (model[item].FieldType.toLowerCase()) {
          case "string":
          case "text":
          case "varchar":
            result[item] = () => {
              return faker.datatype.string(50);
            };
            break;
          case "int":
          case "integer":
            result[item] = () => {
              return faker.datatype.number(10000000);
            };
            break;
          case "bigint":
            result[item] = () => {
              return faker.datatype.number(10000000);
            };
            break;
          case "decimal":
          case "float":
            result[item] = () => {
              return faker.datatype.float({
                min: 0,
                max: 1000000000,
                precision: 5,
              });
            };
            break;
          case "smallint":
            result[item] = () => {
              return faker.datatype.number(65000);
            };
            break;
          case "boolean":
            result[item] = () => {
              return faker.datatype.boolean();
            };
            break;
          case "uuid":
            result[item] = () => {
              return faker.datatype.uuid();
            };
            break;
          case "date":
          case "datetime":
            result[item] = () => {
              return faker.datatype.datetime();
            };
            break;
          case "tinyint":
            result[item] = () => {
              return faker.datatype.number(255);
            };
            break;
          default:
            break;
        }
      });
      var output = {};
      if (!array) {
        Object.keys(result).map((item, j) => {
          output[item] = result[item]();
        });
        return output;
      } else {
        return [...Array(count)].map((item, j) => {
          Object.keys(result).map((item, j) => {
            output[item] = result[item]();
          });
          return output;
        });
      }
    }
    return null;
  };

  EventManager = (eventName, component) => {
    const componentName = component.constructor
      ? component.constructor.name
      : null;
    const parentComponent = Object.getPrototypeOf(component.constructor).name;
    const isView = parentComponent == "ParentAppView";
  };

  processResponse(router, response, notify) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  }

  prepareAppContext(response) {}

  getStorage(key, decode) {
    try {
      var val = localStorage.getItem(key);
      if (!val) return null;
      if (decode) return JSON.parse(val);
      else return val;
    } catch (error) {
      return null;
    }
  }

  setStorage(key, value, encode) {
    try {
      var val = value;
      if (encode) val = JSON.stringify(val);
      return localStorage.setItem(key, val);
    } catch (error) {
      return null;
    }
  }

  removeStorage(key) {
    return localStorage.removeItem(key);
  }

  IsMobileSize() {
    return window.innerWidth < 700;
  }

  DownloadBlob(name, response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      link.remove();
    }, 1000);
  }
}

export default new AppManager();
