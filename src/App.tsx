
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CityDetailPage from "./pages/CityDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:id" element={<CityDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
