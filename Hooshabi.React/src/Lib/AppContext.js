import AppManager from "./AppManager";

const AppContext = {
  IsLoaded: false,
  Username: "",
  Token: "",
  Email: "",
  SocketCommands: {},
  DateFormats: {
    GregorianDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
    GregorianDateFormat: "YYYY-MM-DD",
    GregorianTimeFormat: "HH:mm:ss",
    JalaliDateTimeFormat: "jYYYY-jMM-jDD HH:mm:ss",
    JalaliDateFormat: "jYYYY-jM-jD",
    JalaliTimeFormat: "HH:mm:ss",
  },
  IsLogedin: () => {
    return AppContext.GetUsername() && AppContext.GetToken();
  },
  GetToken: () => {
    var token = AppManager.getStorage("Token");
    if (token) return token;
    return "";
  },
  GetUsername:()=>{
    var username = AppManager.getStorage("Username");
    if (username) return username;
    return "";
  },
  Translate: (key, type) => {
    if (!AppContext || process.env.REACT_APP_ISBUILDER == "true") return "";
    if (!AppContext.IsLoaded) return key;
    return key;
  },
};

export default AppContext;
