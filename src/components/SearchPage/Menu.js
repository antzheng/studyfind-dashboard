import React, { useState } from "react";

const Menu = () => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const toggleOpen = () => setOpen(!open);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <div
        className={
          open
            ? "hamburger hamburger--squeeze is-active"
            : "hamburger hamburger--squeeze"
        }
        onClick={toggleOpen}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner"></div>
        </div>
      </div>

      <div
        className="slide-in-menu"
        style={{ transform: open ? "" : "translateY(-100vh)" }}
      ></div>
    </>
  );
};

export default Menu;
