import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import ResultCard from "./ResultCard";
import { Spin, Pagination, Button } from "antd";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";
import { paginateStudies } from "../../resources/utils/api";

const Results = ({ info, pageNumber, ready }) => {
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
    if (oldURL !== newURL) history.push(newURL);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <Button
          type="link"
          size="small"
          onClick={() => goToPage(pageNumber - 1)}
        >
          Previous
        </Button>
      );
    }
    if (type === "next") {
      return (
        <Button
          type="link"
          size="small"
          onClick={() => goToPage(pageNumber + 1)}
        >
          Next
        </Button>
      );
    }
    return originalElement;
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <div className="searchpage-results-container">
      <div className="searchpage-results-items">
        <div className="searchpage-results-navbar-covering" />
        <div className="searchpage-results-buttons">
          <FilterButton />
          <VisualizeButton />
        </div>
        <div className="searchpage-results-space-above" />
        {ready ? (
          <>
            {studies[(pageNumber - 1) % 100] === undefined ? (
              <div className="searchpage-results-card">
                No search results found!
              </div>
            ) : (
              <>
                {studies[(pageNumber - 1) % 100].map((study, index) => (
                  <ResultCard key={index} study={study} />
                ))}
                <div className="searchpage-footer">
                  <img src={StudyFindLogo} alt="studyfind" />
                  <Pagination
                    simple={true}
                    defaultCurrent={1}
                    current={pageNumber}
                    total={info.totalStudies}
                    showSizeChanger={false}
                    itemRender={itemRender}
                    onChange={(page) => goToPage(page)}
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
