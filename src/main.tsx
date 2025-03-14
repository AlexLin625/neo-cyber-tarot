import ReactDOM from "react-dom/client";
import App from "./app";
import store from "./states/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
