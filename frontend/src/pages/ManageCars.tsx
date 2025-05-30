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
    <div className="manage-cars-container">
      <h2 className="manage-cars-heading">Управление на обяви</h2>
      {cars.length === 0 ? (
        <p className="cars-empty">Няма налични обяви.</p>
      ) : (
        cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-content">
              <div className="car-info">
                <h3>{car.brand}</h3>
                <p>Година на производство: {car.production_year}</p>
                <p>Двигател: {car.engine_type}</p>
                <p>Мощност: {car.horsepower} к.с.</p>
                <p>Пробег: {car.mileage} км</p>
                <p>Цена: {car.price} лв.</p>
                <p>Информация: {car.description}</p>
              </div>
              <div className="car-image">
                {car.image_url && <img src={car.image_url} alt="car" />}
                <div className="car-card-buttons-bottom-row">
                  <Link to={`/edit-car/${car.id}`}>
                    <button>Редактирай</button>
                  </Link>
                  <button onClick={() => handleDelete(car.id!)}>Изтрий</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageCars;
