import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar";
import EditCar from "./pages/EditCar";
import UserList from "./pages/UserList";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import CreateCar from "./pages/CreateCar";


function App() {
  return (
    <Router>
      <>
      <Navbar />
      </>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path="/manage-users" element={<div>Управление на потребители</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/edit-car/:id" element={<EditCar />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;

