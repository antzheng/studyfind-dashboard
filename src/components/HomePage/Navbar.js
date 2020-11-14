import React from "react";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-items">
        <div className="navbar-about">
          <h3>About</h3>
        </div>
        <div className="navbar-space" />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
