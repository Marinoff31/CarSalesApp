import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ICar, IUser } from "../../common/interfaces";

const CreateCar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState<ICar>({
    brand: "",
    production_year: undefined as any,
    mileage: 0,
    engine_type: "Бензин",
    horsepower: 0,
    price: 0,
    image_url: "",
    description: "",
    owner_id: 0,
  });

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get<IUser[]>("http://localhost:3000/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: name === "owner_id" || name === "production_year" || name === "horsepower" || name === "price" || name === "mileage"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/cars", car);
      navigate("/manage-cars");
    } catch (err) {
      console.error("Грешка при създаване на кола:", err);
      alert("Възникна грешка при създаването на обявата.");
    }
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      <h2 style={{ color: "white" }}>Създай обява</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem", background: "transparent" }}
      >
        <label style={{ color: "white" }}>
          Марка:
          <input
            style={{
            borderColor: "#000" }}
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
          />
        </label>

        <label style={{ color: "white" }}>
          Година на производство:
          <input
            style={{
            borderColor: "#000"}}
            name="production_year"
            type="number"
            value={car.production_year || ""}
            onChange={handleChange}
            required
          />
        </label>

        <label style={{ color: "white" }}>
          Пробег (км):
          <input
            style={{
            borderColor: "#000"}}
            name="mileage"
            type="number"
            value={car.mileage}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "white" }}>
          Тип двигател:
          <select style={{ borderColor: "#000"}} name="engine_type" value={car.engine_type} onChange={handleChange}>
            <option>Бензин</option>
            <option>Дизел</option>
            <option>Електрически</option>
            <option>Хибрид</option>
          </select>
        </label>

        <label style={{ color: "white" }}>
          Конски сили:
          <input
          style={{
            borderColor: "#000"}}
            name="horsepower"
            type="number"
            value={car.horsepower}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "white" }}>
          Цена (лв.):
          <input
          style={{
            borderColor: "#000"}}
            name="price"
            type="number"
            value={car.price}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "white" }}>
          Линк към снимка:
          <input
          style={{
            borderColor: "#000"}}
            name="image_url"
            value={car.image_url}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "white" }}>
          Описание:
          <textarea
          style={{
            borderColor: "#000"}}
            name="description"
            value={car.description}
            onChange={handleChange}
          />
        </label>

        <label style={{ color: "white" }}>
          Собственик:
          <select style={{ borderColor: "#000"}} name="owner_id" value={car.owner_id} onChange={handleChange} required>
            <option value="">-- Избери потребител --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.id})
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Създай</button>
      </form>
    </div>
  );
};

export default CreateCar;
