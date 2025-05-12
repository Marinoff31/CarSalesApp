import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ICar } from "../../common/interfaces";

const ManageCars = () => {
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
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "white" }}>Управление на обяви</h2>
      <Link to="/create-car">
        <button>Създай обява</button>
      </Link>
      {cars.length === 0 ? (
        <p>Няма налични обяви.</p>
      ) : (
        cars.map((car) => (
          <div
            key={car.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3 style={{ color: "white" }}>{car.brand} - {car.production_year}</h3>
            <p style={{ color: "white" }}>{car.engine_type} / {car.horsepower} к.с. / {car.mileage} км</p>
            <p style={{ color: "white" }}>Цена: {car.price} лв.</p>
            {car.image_url && <img src={car.image_url} alt="car" style={{ width: "200px" }} />}
            <p style={{ color: "white" }}>{car.description}</p>
            <Link to={`/edit-car/${car.id}`}>
              <button style={{ marginRight: "0.5rem" }}>Редактирай</button>
            </Link>
            <button onClick={() => handleDelete(car.id!)}>Изтрий</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageCars;
