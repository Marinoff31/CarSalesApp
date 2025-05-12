import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/manage-cars" element={<div>Управление на обяви (в процес на разработка)</div>} />
        <Route path="/manage-users" element={<div>Управление на потребители (в процес на разработка)</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;

