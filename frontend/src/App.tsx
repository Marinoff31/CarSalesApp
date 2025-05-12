// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateCar from './pages/CreateCar';
import Listings from './pages/Listings';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCar />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </Router>
  );
};

export default App;
