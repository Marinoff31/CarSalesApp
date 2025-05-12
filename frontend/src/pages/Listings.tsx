import { useEffect, useState } from 'react';
import CarForm from '../components/CarForm';

interface CarData {
  brand: string;
  production_year: number;
  mileage: number;
  engine_type: 'Бензин' | 'Дизел' | 'Електрически' | 'Хибрид';
  horsepower: number;
  price: number;
  description?: string;
  image_url?: string;
}

interface CarDataWithId extends CarData {
  id: number;
}

export default function Listings() {
  const [cars, setCars] = useState<CarDataWithId[]>([]);
  const [editingCar, setEditingCar] = useState<CarDataWithId | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCars = async () => {
    try {
      const res = await fetch('http://localhost:3000/cars');
      const data = await res.json();
      setCars(data);
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/cars/${id}`, { method: 'DELETE' });
    loadCars();
  };

  const handleEdit = (car: CarDataWithId) => {
    setEditingCar(car);
  };

  if (loading) {
    return <div>Зареждам обявите...</div>;
  }

  return (
    <div>
      <h1>Всички обяви</h1>
      {editingCar && (
        <CarForm
          initialData={editingCar}
          onSubmit={async (data: CarData) => {
            const carDataWithId: CarDataWithId = { ...data, id: editingCar.id };
            await fetch(`http://localhost:3000/cars/${editingCar.id}`, {
              method: 'PUT',
              body: JSON.stringify(carDataWithId),
              headers: { 'Content-Type': 'application/json' },
            });
            setEditingCar(null);
            loadCars();
          }}
        />
      )}
      <ul>
        {cars.length > 0 ? (
          cars.map((car) => (
            <li key={car.id}>
              {car.brand} - {car.price} лв
              <button onClick={() => handleEdit(car)}>Редактирай</button>
              <button onClick={() => handleDelete(car.id)}>Изтрий</button>
            </li>
          ))
        ) : (
          <li>Няма обяви за показване.</li>
        )}
      </ul>
    </div>
  );
}
