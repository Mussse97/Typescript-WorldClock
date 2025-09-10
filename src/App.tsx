
import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CityDetailPage from "./pages/CityDetailPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:id" element={<CityDetailPage />} />
      </Routes>
    </Router>
  );
}


