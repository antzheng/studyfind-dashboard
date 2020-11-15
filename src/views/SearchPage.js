import React, { useState, useEffect } from "react";
import Navbar from "./../components/SearchPage/Navbar";
import Results from "./../components/SearchPage/Results";
import {
  getStudiesFromSearch,
  splitStudiesIntoPages,
} from "./../resources/utils/api";

const SearchPage = (props) => {
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
    const relatedStudies = getStudiesFromSearch(
      props.studies,
      props.searchTerms
    );
    const splitStudies = splitStudiesIntoPages(relatedStudies, resultsPerPage);
    setResults(splitStudies);
  }, [props.searchTerms, props.studies]);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  // TODO: make handler functions

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Navbar keywords={props.keywords} searchTerms={props.searchTerms} />
      <Results results={results} pageNumber={props.pageNumber} />
    </>
  );
};

export default SearchPage;
