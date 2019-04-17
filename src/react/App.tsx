import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import store from "../redux/store";

import Auth from "./Auth";
import Home from "./views/Home";
import Login from "./views/Login";

/**
 * App root.
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <Auth />
      <Router>
        <Switch>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/login" exact={true} component={Login} />
          <Route
            path="/"
            exact={true}
            // tslint:disable-next-line jsx-no-lambda
            render={() => <Redirect to="/home" />}
          />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}
