import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    brand: "",
    engine_type: "",
    min_price: "",
    max_price: "",
    year: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams(filters as any).toString();
    navigate(`/search?${params}`);
  };

  return (
    <div className="home-search-container">
      <div className="home-search-box">
        <h2 className="form-heading">Търсене на автомобили</h2>
        <div className="home-search-fields">
          <input name="brand" placeholder="Марка" onChange={handleChange} />
          <input name="year" placeholder="Година на производство" type="number" onChange={handleChange} />
          <input name="min_price" placeholder="Минимална цена" type="number" onChange={handleChange} />
          <input name="max_price" placeholder="Максимална цена" type="number" onChange={handleChange} />
          <select name="engine_type" onChange={handleChange}>
            <option value="">Тип двигател</option>
            <option value="Бензин">Бензин</option>
            <option value="Дизел">Дизел</option>
            <option value="Електрически">Електрически</option>
            <option value="Хибрид">Хибрид</option>
          </select>
          <button onClick={handleSearch}>Търси</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
