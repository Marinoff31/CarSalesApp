import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Начало</Link>
        </li>
        <li style={styles.li}>
          <Link to="/manage-cars" style={styles.link}>Управление на обяви</Link>
        </li>
        <li style={styles.li}>
          <Link to="/users" style={styles.link}>Управление на потребители</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  ul: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  li: {
    display: "inline",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;
