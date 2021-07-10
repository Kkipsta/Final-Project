import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css"


import store from "./redux/store"
import { Provider } from 'react-redux'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

    <Provider store={store}>
      <App />
      </Provider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

