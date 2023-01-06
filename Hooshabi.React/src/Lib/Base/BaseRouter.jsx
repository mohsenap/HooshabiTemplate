import React, { Component } from "react";
import BaseView from "./BaseView";
import AppManifest from "../../App/AppManifest";
import WithRouter from "./WithRouter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  matchRoutes,
} from "react-router-dom";
import AppManager from "../AppManager";
import AppContext from "../AppContext";
import AdminRouter from "./AdminRouter";
import MainRouter from "../../App/MainRouter";

function BaseRouter(props) {
  var counter = 0;
  const AppRoute = (props) => (
    <Routes>
      {AppManifest.Views.map((view) => {
        var currentRoute = view;

        const url = currentRoute.Route;
        return (
          <Route
            key={counter++}
            path={url}
            element={
              <WithRouter {...props} view={view} url={url}>
                {(props) => {
                  console.log(AppContext);

                  if (
                    currentRoute &&
                    currentRoute.Authorization &&
                    (!AppContext.GetUsername() ||
                      AppContext.GetUsername().length < 1)
                  ) {
                    return (
                      <Navigate
                        to={`/login${
                          currentRoute.Route
                            ? `?returnUrl=${currentRoute.Route}`
                            : ``
                        }`}
                      />
                    );
                  }
                  return (
                    <BaseView
                      view={view}
                      route={currentRoute}
                      autoLoad={view.Component.AutoLoad == true}
                      {...props}
                    />
                  );
                }}
              </WithRouter>
            }
          ></Route>
        );
      })}
      {
        <React.Fragment>
          <Route
            key="NotFound"
            path="*"
            element={
              <WithRouter {...props}>
                {(props) => {
                  return (
                    <div>{AppContext.Translate("NotFound", "label")}!</div>
                  );
                }}
              </WithRouter>
            }
          ></Route>
          <Route
            key="Logout"
            path="/logout"
            element={
              <WithRouter {...props}>
                {(props) => {
                  AppManager.removeUserStorage();
                  //props.router.navigate("/login", { replace: true });
                  return (
                    <Navigate
                      to={`/login`}
                    />
                  );
                }}
              </WithRouter>
            }
          ></Route>
        </React.Fragment>
      }
    </Routes>
  );
  if (props.context && props.context.error) {
    props.router.navigate(`/error`);
  }

  var isAdmin = false;
  if (process.env.REACT_APP_SERVERAPP != "true") {
    isAdmin =
      window.location.pathname.startsWith("/administratorpanel") ||
      window.location.pathname.startsWith("administratorpanel");
  } else {
    var url = props.requestUrl;
    isAdmin =
      url.startsWith("/administratorpanel") ||
      url.startsWith("administratorpanel");
  }

  var currentRoute = null;
  var currentRouteKey = "";
  var viewMatched = null;

  for (const key in AppContext.AppViews) {
    const item = AppContext.AppViews[key];
    const url = item.Route;
    console.log(url);
    const match = matchRoutes([{ path: url }], window.location);
    if (match != null) {
      currentRouteKey = key;
      currentRoute = item;
      break;
    }
  }

  if (currentRoute) {
    viewMatched = AppManifest.Views.filter((view) => {
      if (view.Name.toLowerCase() == currentRouteKey.toLowerCase()) {
        return true;
      }
      return false;
    });
  }

  var currentView =
    viewMatched && viewMatched.length > 0
      ? viewMatched[viewMatched.length - 1]
      : null;

  if (currentRoute && currentView) {
    window.document.title = currentRoute.Title;
  }

  if (isAdmin) {
    if (process.env.REACT_APP_SERVERAPP == "true") {
      return (
        <AdminRouter>
          <AppRoute {...props} />
        </AdminRouter>
      );
    } else {
      return (
        <Router>
          <AdminRouter {...props}>
            <AppRoute {...props} />
          </AdminRouter>
        </Router>
      );
    }
  } else {
    if (AppContext.GetUsername()) {
      var ViewRouter =
        (currentView &&
          currentView.Component &&
          typeof currentView.Component.DefaultRuter == "undefined") ||
        (currentView &&
          currentView.Component &&
          currentView.Component.DefaultRuter == null)
          ? MainRouter
          : currentView
          ? currentView.Component.DefaultRuter
          : null;
      if (process.env.REACT_APP_SERVERAPP == "true") {
        if (ViewRouter)
          return (
            <ViewRouter {...props}>
              <AppRoute {...props} />
            </ViewRouter>
          );
        else return <AppRoute {...props} />;
      } else {
        if (ViewRouter)
          return (
            <Router>
              <ViewRouter {...props}>
                <AppRoute />
              </ViewRouter>
            </Router>
          );
        else
          return (
            <Router>
              <AppRoute />
            </Router>
          );
      }
    } else {
      if (process.env.REACT_APP_SERVERAPP == "true") {
        return <AppRoute {...props} />;
      } else {
        return (
          <Router>
            <AppRoute />
          </Router>
        );
      }
    }
  }
}

export default BaseRouter;
