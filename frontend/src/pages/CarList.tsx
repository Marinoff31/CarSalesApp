import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ICar } from "../../common/interfaces";

const CarList = () => {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get<ICar[]>("http://localhost:3000/cars");
      setCars(res.data);
    };
    fetchCars();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете тази обява?")) {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Управление на обявите</h2>
      <Link to="/create-car">
        <button style={{ marginBottom: "1rem" }}>Създай обява</button>
      </Link>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {cars.map((car) => (
          <div key={car.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <h3>{car.brand}</h3>
            {car.image_url && <img src={car.image_url} alt="car" style={{ width: "150px", marginBottom: "0.5rem" }} />}
            <p>Година: {car.production_year}</p>
            <p>{car.description}</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to={`/edit-car/${car.id}`}>
                <button>Редактирай</button>
              </Link>
              <button onClick={() => handleDelete(car.id!)}>Изтрий</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
