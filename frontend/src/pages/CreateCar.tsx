import React, { useState } from 'react';

const CreateCar = () => {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Тук може да добавиш логика за изпращане на данни към сървъра
    console.log('Създаване на нов автомобил', { brand, price });
  };

  return (
    <div>
      <h2>Създаване на нова обява</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Марка:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Цена:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Създай обява</button>
      </form>
    </div>
  );
};

export default CreateCar;
