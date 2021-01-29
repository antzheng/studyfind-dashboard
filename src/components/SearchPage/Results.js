import React from "react";
import { useHistory, Link } from "react-router-dom";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import ResultCard from "./ResultCard";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const Results = ({ results, pageNumber }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const history = useHistory();

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goToPage = (page) => {
    const oldURL = history.location.pathname;
    const newURL = oldURL.slice(0, oldURL.lastIndexOf("/") + 1) + page;
    history.push(newURL);
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <div className="searchpage-results-container">
      <div className="searchpage-results-items">
        <div className="searchpage-results-navbar-covering" />
        <div className="searchpage-results-buttons">
          <FilterButton />
          <VisualizeButton />
        </div>
        <div className="searchpage-results-space-above" />
        {results[pageNumber - 1] === undefined ? (
          <div className="searchpage-results-card">
            No search results found!
          </div>
        ) : (
          results[pageNumber - 1].map((info) => <ResultCard info={info} />)
        )}
        <div className="searchpage-footer">
          <img src={StudyFindLogo} alt="studyfind" />
          {results.map((item, index) => (
            <Link
              className={index === pageNumber - 1 ? "highlighted" : ""}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
