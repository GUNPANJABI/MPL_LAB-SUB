import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./app/store.js";

// ✅ Register the service worker
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("🔄 New content available. Refresh the app to update.");
  },
  onOfflineReady() {
    console.log("✅ App is ready to work offline.");
  },
}); // enables offline support and updates

// ✅ Render the React app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
