import React from "react";
import ReactDOM from "react-dom";
import "reset-css";

import "./styles/App.css";
import "./styles/CreatePage.scss";
import "./styles/MainPage.scss";
import "./styles/UserPage.scss";
import "./styles/Popup.scss";
import "./styles/MapReact.css";
import "./styles/MarkPicker.scss";
import "./styles/mobile.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
