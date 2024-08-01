// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.scss";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts"; // Убедитесь, что импортируете store из правильного файла

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
