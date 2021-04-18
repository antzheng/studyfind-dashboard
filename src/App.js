import React, { useState, useEffect } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./views/HomePage";
import SearchPage from "./views/SearchPage";
import GraphPage from "./views/GraphPage";
import { getKeywords } from "./resources/utils/api";
import "./styles/css/App.scss";

const App = () => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [keywords, setKeywords] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // call api once whenever app boots up for the first time
  useEffect(() => {
    setKeywords(getKeywords());
  }, []);

  // change body color based on light or dark mode
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#1c1e23" : "white";
  }, [darkMode]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <HashRouter basename="/">
      <Switch>
        <>
          <div className={darkMode ? "ultra dark-mode" : "ultra"}>
            <Route
              exact
              path="/"
              component={() => (
                <HomePage
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  keywords={keywords}
                />
              )}
            />
            <Route
              path="/search/:searchTerms/page/:pageNumber"
              component={({ match }) => (
                <SearchPage
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  keywords={keywords}
                  searchTerms={match.params.searchTerms}
                  pageNumber={parseInt(match.params.pageNumber)}
                />
              )}
            />
            <Route
              path="/search/:searchTerms/visualize/minRank/:minRank/maxRank/:maxRank"
              component={({ match }) => (
                <GraphPage
                  darkMode={darkMode}
                  searchTerms={match.params.searchTerms}
                  minRank={parseInt(match.params.minRank)}
                  maxRank={parseInt(match.params.maxRank)}
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
