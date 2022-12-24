import DefaultView from "./Views/Default/DefaultView";
import View1View from "./Views/View1/View1View";
import LoginView from "./Views/Login/LoginView";
import AboutUsView from "./Views/AboutUs/AboutUsView";
import AdminView from "./Views/Admin/AdminView";
import BrandView from "./Views/Brand/BrandView";

//References//
class AppManifest {
  static AppInfo = {
    AppId: "A5A5EAA5-DD57-40CC-8735-CD8EABECB66D",
    Name: "",
    ProductionEnvironment: false,
    Root: "clientapp",
  };

  static Views = [
    { Name: "Default", Route: "", Authorization: false, Component: DefaultView },
    { Name: "View1", Route: "view1", Authorization: false, Component: View1View },
    { Name: "Brand", Route: "brand", Authorization: true, Component: BrandView },
    { Name: "Login", Route: "login", Authorization: false, Component: LoginView },
    {
      Name: "AboutUs",
      Route: "aboutus",
      Authorize: false,
      Component: AboutUsView,
    },
    { Name: "Admin", Route: "admin", Authorize: false, Component: AdminView },
    //Views//
  ];
}

export default AppManifest;
