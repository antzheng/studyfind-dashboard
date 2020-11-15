import React from "react";

const ResultCard = (props) => {
  return (
    <div className="searchpage-results-card">
      <h3>{props.info.title}</h3>
      <span>{props.info.description.substring(0, 400) + "..."}</span>
    </div>
  );
};

export default ResultCard;
