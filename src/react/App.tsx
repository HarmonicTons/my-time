import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import store from "../redux/store";

import Home from "./views/Home";
import Other from "./views/Other";

/**
 * App root.
 */
export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Switch>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/other" exact={true} component={Other} />
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
