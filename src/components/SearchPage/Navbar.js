import React from "react";
import { useHistory } from "react-router-dom";
import Searchbar from "./Searchbar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const Navbar = ({ darkMode, setDarkMode, keywords, searchTerms }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const history = useHistory();

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goHome = () => {
    history.push("/");
    window.scrollTo(0, 0);
  };

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
        <Searchbar keywords={keywords} searchTerms={searchTerms} />
        <div className="searchpage-navbar-space-after" />
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
