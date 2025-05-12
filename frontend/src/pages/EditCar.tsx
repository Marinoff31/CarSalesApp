import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ICar } from "../../common/interfaces";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get<ICar>(`http://localhost:3000/cars/${id}`);
        setCar(res.data);
        setLoading(false);
      } catch (err) {
        setError("Не успяхме да заредим обявата.");
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCar((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/cars/${id}`, car);
      navigate("/");
    } catch (err) {
      setError("Не успяхме да запишем промените.");
    }
  };

  if (loading) return <p>Зареждаме...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Редактирай обява</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="brand"
          value={car?.brand ?? ""}
          onChange={handleChange}
          placeholder="Марка"
          required
        />
        <input
          name="production_year"
          value={car?.production_year ?? ""}
          onChange={handleChange}
          type="number"
          required
        />
        <input
          name="mileage"
          value={car?.mileage ?? ""}
          onChange={handleChange}
          type="number"
          required
        />
        <select
          name="engine_type"
          value={car?.engine_type ?? ""}
          onChange={handleChange}
        >
          <option value="Бензин">Бензин</option>
          <option value="Дизел">Дизел</option>
          <option value="Електрически">Електрически</option>
          <option value="Хибрид">Хибрид</option>
        </select>
        <input
          name="horsepower"
          value={car?.horsepower ?? ""}
          onChange={handleChange}
          type="number"
        />
        <input
          name="price"
          value={car?.price ?? ""}
          onChange={handleChange}
          type="number"
        />
        <input
          name="image_url"
          value={car?.image_url ?? ""}
          onChange={handleChange}
          placeholder="Снимка (URL)"
        />
        <textarea
          name="description"
          value={car?.description ?? ""}
          onChange={handleChange}
          placeholder="Описание"
        />

        <button type="submit">Запази промените</button>
      </form>
    </div>
  );
};

export default EditCar;
