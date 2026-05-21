import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { Index } from "./routes/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
);