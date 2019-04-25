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
import Activities from "./views/Activities";
import Report from "./views/Report";

/**
 * App root.
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <Auth />
      <Router>
        <Switch>
          <Route path="/activities" exact={true} component={Activities} />
          <Route path="/report" exact={true} component={Report} />
          <Route
            path="/"
            exact={true}
            // tslint:disable-next-line jsx-no-lambda
            render={() => <Redirect to="/activities" />}
          />
        </Switch>
      </Router>
    </ReduxProvider>
  );
}
