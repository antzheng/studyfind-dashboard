import React, { useState, useEffect } from "react";
import Navbar from "./../components/SearchPage/Navbar";
import Results from "./../components/SearchPage/Results";
import {
  getStudiesFromSearch,
  splitStudiesIntoPages,
} from "./../resources/utils/api";

const SearchPage = ({ studies, keywords, searchTerms, pageNumber }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [results, setResults] = useState([[]]);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // only update results list if searchTerms ever change
  useEffect(() => {
    const resultsPerPage = 5;
    const relatedStudies = getStudiesFromSearch(studies, searchTerms.trim());
    const splitStudies = splitStudiesIntoPages(relatedStudies, resultsPerPage);
    setResults(splitStudies);
  }, [searchTerms, studies]);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  // TODO: make handler functions

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Navbar keywords={keywords} searchTerms={searchTerms.trim()} />
      <Results results={results} pageNumber={pageNumber} />
    </>
  );
};

export default SearchPage;
