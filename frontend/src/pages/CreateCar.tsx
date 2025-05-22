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
    <div className="create-car-container">
      <h2 className="form-heading">Създай обява</h2>
      <form onSubmit={handleSubmit} className="car-form">
        <label>
          Марка:
          <input name="brand" value={car.brand} onChange={handleChange} required />
        </label>

        <label>
          Година на производство:
          <input name="production_year" type="number" value={car.production_year || ""} onChange={handleChange} required />
        </label>

        <label>
          Пробег (км):
          <input name="mileage" type="number" value={car.mileage} onChange={handleChange} />
        </label>

        <label>
          Тип двигател:
          <select name="engine_type" value={car.engine_type} onChange={handleChange}>
            <option>Бензин</option>
            <option>Дизел</option>
            <option>Електрически</option>
            <option>Хибрид</option>
          </select>
        </label>

        <label>
          Конски сили:
          <input name="horsepower" type="number" value={car.horsepower} onChange={handleChange} />
        </label>

        <label>
          Цена (лв.):
          <input name="price" type="number" value={car.price} onChange={handleChange} />
        </label>

        <label>
          Линк към снимка:
          <input name="image_url" value={car.image_url} onChange={handleChange} />
        </label>

        <label>
          Описание:
          <textarea name="description" value={car.description} onChange={handleChange} />
        </label>

        <label>
          Собственик:
          <select name="owner_id" value={car.owner_id} onChange={handleChange} required>
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
