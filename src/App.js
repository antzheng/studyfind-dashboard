import React, { useState, useEffect } from "react";
import HomePage from "./views/HomePage";
import { getFullStudies, getKeywordsFromStudies } from "./resources/utils/api";
import "./styles/css/App.scss";

const App = () => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [keywords, setKeywords] = useState([]);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // call api once whenever app boots up for the first time
  useEffect(() => {
    getFullStudies().then((data) => {
      setKeywords(getKeywordsFromStudies(data));
    });
  }, []);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <div className="ultra">
      <HomePage keywords={keywords} />
    </div>
  );
};

export default App;
