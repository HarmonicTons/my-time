import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { storiesOf } from "@storybook/react";

import AppHeader from "./AppHeader";
import AppIcon from "./AppIcon";

storiesOf("Business", module)
  .add("Header", () => (
    <Router>
      <AppHeader current="home" />
    </Router>
  ))
  .add("Icon", () => <AppIcon style={{ width: 64, height: 64 }} />);
