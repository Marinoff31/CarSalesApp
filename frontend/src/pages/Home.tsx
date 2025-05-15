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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h2 style={{ color: "white" }}>Търсене на автомобили</h2>
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "400px", margin: "0 auto", gap: "1rem", alignItems: "center" }}>
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
      <button style={{ marginTop: "1rem" }} onClick={handleSearch}>Търси</button>
    </div>
  </div>
</div>

  );
};

export default Home;
