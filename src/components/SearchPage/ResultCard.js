import React from "react";

const ResultCard = ({ study }) => {
  return (
    <div className="searchpage-results-card">
      <h3>{study.briefTitle}</h3>
      <span>{study.briefSummary.substring(0, 400) + "..."}</span>
    </div>
  );
};

export default ResultCard;
