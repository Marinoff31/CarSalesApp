import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IUser } from "../../common/interfaces";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", address: "", phone: "" });

 useEffect(() => {
  const fetchUser = async () => {
    const res = await axios.get<IUser>(`http://localhost:3000/users/${id}`);
    setUser(res.data); // сега TypeScript знае, че res.data е IUser
  };
  fetchUser();
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/users/${id}`, user);
    navigate("/users");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "#fff" }}>Редактирай потребител</h2>
      <form onSubmit={handleSubmit} style={{ background: "transparent" }}>
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
        <button type="submit">Запази промените</button>
      </form>
    </div>
  );
};

export default EditUser;
