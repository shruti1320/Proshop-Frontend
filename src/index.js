import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store.js";
import global_en from "./locales/en/global.json"
import global_sp from "./locales/sp/global.json"
import i18n from "./i18n.js";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

i18n.init({
  interpolation: {
    escapeValue: false
  },
  lng : "en",
  resources : {
    en : {
      global: global_en
    },
    sp : {
      global: global_sp
    },
  }
})

ReactDOM.render(
  <>
    <React.StrictMode>
      
      <Provider store={store}>
      <I18nextProvider i18n = {i18next}>
      
      <App />
      </I18nextProvider>
      </Provider>
      
    </React.StrictMode>
  </>,
  document.getElementById("root")
);
