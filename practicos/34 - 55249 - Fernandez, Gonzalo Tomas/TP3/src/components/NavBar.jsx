import { useEffect } from "react";
import PropTypes from "prop-types";
import { FaSun, FaMoon, FaSearch } from "react-icons/fa";
import "../stylesheets/NavBar.css";

const NavBar = ({ searchTerm, setSearchTerm, theme, setTheme }) => {
  const handleChangeTheme = (e) => setTheme(e.target.checked ? "dark" : "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <nav>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxLength={15}
          className="search-input"
        />
      </div>
      <div className="switch">
        <FaSun />
        <label>
          <input
            type="checkbox"
            className="check-switch"
            onChange={handleChangeTheme}
            checked={theme === "dark"}
            hidden
          />
          <span className="slider"></span>
        </label>
        <FaMoon />
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired, 
  setTheme: PropTypes.func.isRequired,
};

export default NavBar;
