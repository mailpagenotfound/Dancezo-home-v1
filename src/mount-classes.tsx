import React from "react";
import ReactDOM from "react-dom/client";
import { DemoOne } from "@/components/ui/demo";

const container = document.getElementById("react-signature-classes");
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <DemoOne />
    </React.StrictMode>
  );
}
