import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AboutButton from "./AboutButton";
import VisualizeButton from "./VisualizeButton";
import ResultCard from "./ResultCard";
import { Spin, Pagination, Empty } from "antd";
import { paginateStudies } from "../../resources/utils/api";

const Results = ({ info, pageNumber, ready, range, searchTerms }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const history = useHistory();
  const [studies, setStudies] = useState([[]]);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  useEffect(() => {
    setStudies(paginateStudies(info.studies || [], 10));
  }, [info]);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goToPage = (page) => {
    const oldURL = history.location.pathname;
    const newURL = oldURL.slice(0, oldURL.lastIndexOf("/") + 1) + page;
    if (oldURL !== newURL) {
      history.push(newURL);
      window.scrollTo(0, 0);
    }
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <div className="searchpage-results-container">
      <div className="searchpage-results-items">
        <div className="searchpage-results-navbar-covering" />
        <div className="searchpage-results-buttons">
          <AboutButton info={info} />
          <VisualizeButton
            range={range}
            searchTerms={searchTerms}
            studies={studies}
          />
        </div>
        <div className="searchpage-results-space-above" />
        {ready ? (
          <>
            {studies[(pageNumber - 1) % 100] === undefined ? (
              <div className="searchpage-spinner">
                <Empty />
              </div>
            ) : (
              <>
                {studies[(pageNumber - 1) % 100].map((study, index) => (
                  <ResultCard key={index} study={study} />
                ))}
                <div className="searchpage-footer">
                  <Pagination
                    showSizeChanger={false}
                    current={pageNumber}
                    defaultCurrent={1}
                    total={info.totalStudies}
                    onChange={goToPage}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="searchpage-spinner">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
