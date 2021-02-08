import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./views/HomePage";
import SearchPage from "./views/SearchPage";
import { getKeywords } from "./resources/utils/api";
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
    setKeywords(getKeywords());
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
                  keywords={keywords}
                  searchTerms={match.params.searchTerms}
                  pageNumber={parseInt(match.params.pageNumber)}
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
