import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import FileBrowser from "./FileBrowser.jsx";
import store from "./store.jsx";

render(
  <Provider store={store}>
    <FileBrowser />
  </Provider>,
  document.getElementById("root")
);
