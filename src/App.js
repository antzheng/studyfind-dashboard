import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
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
    <HashRouter basename="/">
      <Switch>
        <div className="ultra">
          <Route
            exact
            path="/"
            component={() => <HomePage keywords={keywords} />}
          />
        </div>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
};

export default App;
