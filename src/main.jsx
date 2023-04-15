import React, { StrictMode }  from "react";
import { createRoot } from "react-dom/client"
import App from "./App";
import "./globals.css";

const container = createRoot(document.getElementById("root"))
container.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

