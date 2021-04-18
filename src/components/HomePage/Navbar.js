import React from "react";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NightsStayIcon from "@material-ui/icons/NightsStay";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="navbar-about">
          <h3>About</h3>
        </div>
        <div className="navbar-space" />
        <div
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Brightness4Icon /> : <NightsStayIcon />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
