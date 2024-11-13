import { createRoot } from "react-dom/client";
import App from '../src/App.jsx'
import { Provider } from 'react-redux';
import "./index.css";
import { HashRouter as Router } from "react-router-dom"; // HashRouter ni import qilyapmiz
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    
    <Router>
      <App />
    </Router>
  </Provider>
);
