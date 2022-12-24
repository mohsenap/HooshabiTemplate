import React from "react";
import DefaultLayout from "./Default/DefaultLayout";
import Layout1Layout from "./Layout1/Layout1";
import AdminLayout from "./AdminLayout/AdminLayout";
//References//

const Layouts = [
  { Name: "Default", Component: DefaultLayout },
  { Name: "Layout1", Component: Layout1Layout },
  { Name: "AdminLayout", Component: AdminLayout },

  //Layouts//
];

export default Layouts;
