import React from "react";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import ResultCard from "./ResultCard";

// TODO: add bottom bar to navigate pages of search results

const Results = (props) => {
  return (
    <div className="searchpage-results-container">
      <div className="searchpage-results-items">
        <div className="searchpage-results-navbar-covering" />
        <div className="searchpage-results-buttons">
          <FilterButton />
          <VisualizeButton />
        </div>
        <div className="searchpage-results-space-above" />
        {props.results[props.pageNumber - 1] === undefined ? (
          <div className="searchpage-results-card">
            No search results found!
          </div>
        ) : (
          props.results[props.pageNumber - 1].map((info) => (
            <ResultCard info={info} />
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
