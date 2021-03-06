import React, { useState, useEffect } from "react";
import Navbar from "./../components/SearchPage/Navbar";
import Results from "./../components/SearchPage/Results";
import {
  getResponseFromSearch,
  getInfoFromResponse,
} from "./../resources/utils/api";

const SearchPage = ({
  darkMode,
  setDarkMode,
  keywords,
  searchTerms,
  pageNumber,
}) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [range, setRange] = useState([NaN, NaN]);
  const [info, setInfo] = useState({});
  const [ready, setReady] = useState(true);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // update range according to page number if necessary
  useEffect(() => {
    const resultsPerPage = 10;
    const lowerBound =
      (Math.ceil((pageNumber * resultsPerPage) / 1000) - 1) * 1000 + 1;
    const upperBound = Math.ceil((pageNumber * resultsPerPage) / 1000) * 1000;
    if (range[0] !== lowerBound && !isNaN(lowerBound)) {
      setRange([lowerBound, upperBound]);
    } else if (!isNaN(range[0]) && isNaN(lowerBound)) {
      setRange([NaN, NaN]);
      setInfo({});
    }
  }, [pageNumber, range]);

  // call API if search or range changes
  useEffect(() => {
    if (!isNaN(range[0]) && !isNaN(range[1])) {
      setReady(false);
      getResponseFromSearch(searchTerms, ...range).then((response) => {
        setInfo(getInfoFromResponse(response));
        setReady(true);
      });
    }
  }, [searchTerms, range]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        keywords={keywords}
        searchTerms={searchTerms.trim()}
      />
      <Results
        darkMode={darkMode}
        info={info}
        pageNumber={pageNumber}
        ready={ready}
        range={range}
        searchTerms={searchTerms}
      />
    </>
  );
};

export default SearchPage;
