import React from "react";
import Searchbar from "./Searchbar";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const Navbar = (props) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const history = useHistory();

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goHome = () => history.push("/");

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <div className="searchpage-navbar">
      <div className="searchpage-navbar-items">
        <div className="searchpage-navbar-about" onClick={goHome}>
          <img src={StudyFindLogo} alt="studyfind" />
        </div>
        <div className="searchpage-navbar-space-before" />
        <h2>StudyFind</h2>
        <Searchbar keywords={props.keywords} searchTerms={props.searchTerms} />
        <div className="searchpage-navbar-space-after" />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
