import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ICar } from "../../common/interfaces";

const CreateCar = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState<ICar>({
    brand: "",
    production_year: 2020,
    mileage: 0,
    engine_type: "Бензин",
    horsepower: 0,
    price: 0,
    image_url: "",
    description: "",
    owner_id: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/cars", car);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Създай обява</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input name="brand" placeholder="Марка" value={car.brand} onChange={handleChange} required />
        <input name="production_year" type="number" value={car.production_year} onChange={handleChange} required />
        <input name="mileage" type="number" value={car.mileage} onChange={handleChange} />
        <select name="engine_type" value={car.engine_type} onChange={handleChange}>
          <option>Бензин</option>
          <option>Дизел</option>
          <option>Електрически</option>
          <option>Хибрид</option>
        </select>
        <input name="horsepower" type="number" value={car.horsepower} onChange={handleChange} />
        <input name="price" type="number" value={car.price} onChange={handleChange} />
        <input name="image_url" placeholder="Линк към снимка" value={car.image_url} onChange={handleChange} />
        <textarea name="description" placeholder="Описание" value={car.description} onChange={handleChange} />
        <button type="submit">Създай</button>
      </form>
    </div>
  );
};

export default CreateCar;
