import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import App from "./containers/App";

import "./styles/normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./fontawesome";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
