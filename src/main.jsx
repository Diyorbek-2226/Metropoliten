import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from 'react-redux'
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <BrowserRouter>
  <App></App>
  </BrowserRouter>
  </Provider>
);
