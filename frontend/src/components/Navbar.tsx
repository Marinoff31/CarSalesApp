import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
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
        <li style={styles.li}>
          <Link to="/manage-cars" className="nav-link">Управление на обяви</Link>
        </li>
        <span className="separator">|</span>
        <li style={styles.li}>
          <Link to="/users" className="nav-link">Управление на потребители</Link>
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
    display: "inline",
  }
};

export default Navbar;
