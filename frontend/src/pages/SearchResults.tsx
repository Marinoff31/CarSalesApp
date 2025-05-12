import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
    <div style={{ padding: "2rem" }}>
      <h2>Резултати от търсенето</h2>
      {cars.length === 0 ? (
        <p>Няма намерени обяви.</p>
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
            <h3>{car.brand} - {car.production_year}</h3>
            <p>{car.engine_type} / {car.horsepower} к.с. / {car.mileage} км</p>
            <p>Цена: {car.price} лв.</p>
            {car.image_url && <img src={car.image_url} alt="car" style={{ width: "200px" }} />}
            {car.description && <p>{car.description}</p>}

            {}
            <Link to={`/edit-car/${car.id}`}>
              <button>✏️Редактирай</button>
            </Link>

            {}
            <button>🗑️Изтрий</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
