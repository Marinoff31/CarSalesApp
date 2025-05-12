import React, { useState } from 'react';

export interface FilterParams {
  brand?: string;
  engine_type?: string;
  min_price?: number;
  max_price?: number;
  mileage?: number;
  year?: number;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterParams) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterParams>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('mileage') || name.includes('year') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <div>
        <input
          name="brand"
          placeholder="Марка"
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div>
        <select
          name="engine_type"
          onChange={handleChange}
          defaultValue=""
          style={{ display: 'block', marginBottom: '10px' }}
        >
          <option value="">Всички двигатели</option>
          <option value="Бензин">Бензин</option>
          <option value="Дизел">Дизел</option>
          <option value="Електрически">Електрически</option>
          <option value="Хибрид">Хибрид</option>
        </select>
      </div>

      <div>
        <input
          name="min_price"
          type="number"
          placeholder="Минимална цена"
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div>
        <input
          name="max_price"
          type="number"
          placeholder="Максимална цена"
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      {}
      <div>
        <input
          name="mileage"
          type="number"
          placeholder="Километри"
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <div>
        <input
          name="year"
          type="number"
          placeholder="Година"
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
      </div>

      <button type="submit">Филтрирай</button>
    </form>
  );
};

export default FilterBar;
