import React, { useEffect, useState } from 'react';
import CarList, { CarDataWithId } from '../components/CarList';
import FilterBar, { FilterParams } from '../components/FilterBar';

export default function Home() {
  const [filters, setFilters] = useState<FilterParams>({});
  const [cars, setCars] = useState<CarDataWithId[]>([]);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const url = new URL('http://localhost:3000/api/cars');
        
        // Проверяваме дали има стойности в filters
        if (filters) {
          Object.keys(filters).forEach((key) => {
            const value = filters[key as keyof FilterParams]; // Явно указване на тип на ключа
            if (value !== undefined && value !== null) {
              url.searchParams.append(key, String(value)); // Преобразуваме в стринг
            }
          });
        }

        const response = await fetch(url.toString());
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Грешка при зареждане на автомобили:', error);
      }
    };

    fetchCarsData();
  }, [filters]);

  return (
    <div>
      <h1>Търсене на автомобили</h1>
      <FilterBar onFilterChange={setFilters} />
      <CarList cars={cars} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}
