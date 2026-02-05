// src/test-router.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";

export default function TestRouter() {
  return (
    <BrowserRouter>
      <div style={{ padding: 40 }}>BrowserRouter mount test — should show this text.</div>
    </BrowserRouter>
  );
}
