import React, { useEffect } from "react";
import "./App.css"; // Import your CSS file
import LoginPage from "./LoginPage";
import ScrapePage from "./ScrapePage";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ScrapePage />} />
      </Routes>
    </div>
  );
}

export default App;
