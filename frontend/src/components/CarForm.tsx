import React, { useState, useEffect } from 'react';

interface CarFormProps {
  initialData?: CarData;
  onSubmit: (data: CarData) => void;
}

export interface CarData {
  brand: string;
  production_year: number;
  mileage: number;
  engine_type: 'Бензин' | 'Дизел' | 'Електрически' | 'Хибрид';
  horsepower: number;
  price: number;
  description?: string;
  image_url?: string;
}

const CarForm: React.FC<CarFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<CarData>({
    brand: '',
    production_year: 2020,
    mileage: 0,
    engine_type: 'Бензин',
    horsepower: 100,
    price: 1000,
    description: '',
    image_url: '',
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'production_year' || name === 'mileage' || name === 'horsepower' || name === 'price'
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Марка:</label>
      <input name="brand" value={formData.brand} onChange={handleChange} required />

      <label>Година на производство:</label>
      <input type="number" name="production_year" value={formData.production_year} onChange={handleChange} required />

      <label>Пробег (км):</label>
      <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />

      <label>Тип двигател:</label>
      <select name="engine_type" value={formData.engine_type} onChange={handleChange}>
        <option value="Бензин">Бензин</option>
        <option value="Дизел">Дизел</option>
        <option value="Електрически">Електрически</option>
        <option value="Хибрид">Хибрид</option>
      </select>

      <label>Конски сили:</label>
      <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} required />

      <label>Цена:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required />

      <label>Описание:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Снимка (URL):</label>
      <input name="image_url" value={formData.image_url} onChange={handleChange} />

      <button type="submit">Запази</button>
    </form>
  );
};

export default CarForm;
