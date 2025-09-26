import React from "react";
import { TemplateList } from "./components/TemplateList";

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <TemplateList />
    </div>
  );
};