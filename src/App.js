import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ConverterPage from "./pages/ConverterPage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  // History state lives here so it's shared between Converter and History pages
  const [history, setHistory] = useState([]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark-base font-urbanist text-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <ConverterPage history={history} setHistory={setHistory} />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage history={history} setHistory={setHistory} />
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
