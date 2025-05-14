import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState({
    cars: false,
    users: false,
  });

  const toggleDropdown = (menu: "cars" | "users", open: boolean) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: open,
    }));
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.leftSection}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.logoText}>CarMarket</span>
      </div>

      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" className="nav-link">Начало</Link>
        </li>

        <span className="separator">|</span>

        {/* Управление на обяви */}
        <li
          style={{ ...styles.li, position: "relative" }}
          onMouseEnter={() => toggleDropdown("cars", true)}
          onMouseLeave={() => toggleDropdown("cars", false)}
        >
          <Link to="/manage-cars" className="nav-link">Управление на обяви</Link>
          {dropdownOpen.cars && (
            <div className="dropdown">
              <Link to="/create-car" className="dropdown-link">Създай обява</Link>
            </div>
          )}
        </li>

        <span className="separator">|</span>

        {/* Управление на потребители */}
        <li
          style={{ ...styles.li, position: "relative" }}
          onMouseEnter={() => toggleDropdown("users", true)}
          onMouseLeave={() => toggleDropdown("users", false)}
        >
          <Link to="/users" className="nav-link">Управление на потребители</Link>
          {dropdownOpen.users && (
            <div className="dropdown">
              <Link to="/create-user" className="dropdown-link">Създай потребител</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#000",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative" as const,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    height: "40px",
  },
  logoText: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  ul: {
    listStyle: "none",
    display: "flex",
    gap: "10px",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  li: {
    display: "inline-block",
    position: "relative" as const,
  },
};

export default Navbar;
