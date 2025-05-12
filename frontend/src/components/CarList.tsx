import React from 'react';
import { CarData } from './CarForm';

interface CarListProps {
  cars: CarDataWithId[];
  onEdit: (car: CarDataWithId) => void;
  onDelete: (id: number) => void;
}

export interface CarDataWithId extends CarData {
  id: number;
}

const CarList: React.FC<CarListProps> = ({ cars, onEdit, onDelete }) => {
  if (cars.length === 0) return <p>Няма намерени обяви.</p>;

  return (
    <div>
      {cars.map(car => (
        <div key={car.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h3>{car.brand} ({car.production_year})</h3>
          <p>Пробег: {car.mileage} км</p>
          <p>Двигател: {car.engine_type}</p>
          <p>Конски сили: {car.horsepower}</p>
          <p>Цена: {car.price} лв</p>
          <p>{car.description}</p>
          {car.image_url && <img src={car.image_url} alt="car" width="200" />}

          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => onEdit(car)}>Редактирай</button>
            <button onClick={() => onDelete(car.id)} style={{ marginLeft: '0.5rem' }}>Изтрий</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
