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
    <div style={{ padding: "2rem" }}>
      <h2>Създай потребител</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Име"
          required
        />
        <input
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Адрес"
          required
        />
        <input
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
        />
        <button type="submit">Създай</button>
      </form>
    </div>
  );
};

export default CreateUser;
