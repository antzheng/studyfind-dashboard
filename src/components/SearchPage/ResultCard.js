import React from "react";

const ResultCard = ({ info }) => {
  return (
    <div className="searchpage-results-card">
      <h3>{info.title}</h3>
      <span>{info.description.substring(0, 400) + "..."}</span>
    </div>
  );
};

export default ResultCard;
