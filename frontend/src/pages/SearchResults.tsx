import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ICar } from "../../common/interfaces";

const SearchResults = () => {
  const location = useLocation();
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get<ICar[]>(`http://localhost:3000/cars${location.search}`);
      setCars(res.data);
    };
    fetchCars();
  }, [location.search]);

  return (
    <div className="search-results-container">
      <h2 className="search-results-heading">Резултати от търсенето</h2>
      {cars.length === 0 ? (
        <p className="cars-empty">Няма намерени обяви.</p>
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
              {car.image_url && (
                <div className="car-image">
                  <img src={car.image_url} alt="car" />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;