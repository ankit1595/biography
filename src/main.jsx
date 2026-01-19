import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScrollProvider } from "./context";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollProvider>
      <App />
    </ScrollProvider>
  </StrictMode>
);
