import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { storiesOf } from "@storybook/react";

import AppMenu from "./AppMenu";

storiesOf("AppMenu", module).add("Menu", () => (
  <Router>
    <AppMenu current="home" />
  </Router>
));
