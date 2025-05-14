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
    <div style={{ padding: "2rem", backgroundColor: "transparent", borderRadius: "8px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ color: "#fff", textAlign: "center", fontSize: "24px" }}>Създай потребител</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "transparent" }}>
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Име"
          required
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #333",
            borderRadius: "4px",
            backgroundColor: "#fff",
            fontSize: "16px",
          }}
        />
        <input
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Адрес"
          required
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #333",
            borderRadius: "4px",
            backgroundColor: "#fff",
            fontSize: "16px",
          }}
        />
        <input
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Телефон"
          required
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #333",
            borderRadius: "4px",
            backgroundColor: "#fff",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#a4a4a4",
            color: "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
        >
          Създай
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
