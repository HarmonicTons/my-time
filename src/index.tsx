import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./react/App";
import registerServiceWorker from "./registerServiceWorker";
import "./style/main.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
