import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./views/HomePage";
import SearchPage from "./views/SearchPage";
import { getFullStudies, getKeywordsFromStudies } from "./resources/utils/api";
import "./styles/css/App.scss";

const App = () => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [studies, setStudies] = useState([]);
  const [keywords, setKeywords] = useState([]);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // call api once whenever app boots up for the first time
  useEffect(() => {
    getFullStudies().then((data) => {
      setStudies(data);
      setKeywords(getKeywordsFromStudies(data));
    });
  }, []);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <HashRouter basename="/">
      <Switch>
        <>
          <div className="ultra">
            <Route
              exact
              path="/"
              component={() => <HomePage keywords={keywords} />}
            />
            <Route
              path="/search/:searchTerms/page/:pageNumber"
              component={({ match }) => (
                <SearchPage
                  studies={studies}
                  keywords={keywords}
                  searchTerms={match.params.searchTerms}
                  pageNumber={match.params.pageNumber}
                />
              )}
            />
          </div>
        </>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
};

export default App;
