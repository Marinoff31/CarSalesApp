import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [user, setUser] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/users", user);
    navigate("/users");
  };

  return (
    <div className="create-user-container">
      <h2 className="form-title">Създай потребител</h2>
      <form onSubmit={handleSubmit} className="create-user-form">
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Име"
          required
          className="form-input"
        />
        <input
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Адрес"
          required
          className="form-input"
        />
        <input
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
          className="form-input"
        />
        <button type="submit" className="form-button">
          Създай
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
