import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FilterButton from "./FilterButton";
import VisualizeButton from "./VisualizeButton";
import ResultCard from "./ResultCard";
import { Spin, Pagination, Button, Empty } from "antd";
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
          {"< Prev"}
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
          {"Next >"}
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
                    simple
                    showSizeChanger={false}
                    current={pageNumber}
                    defaultCurrent={1}
                    total={info.totalStudies}
                    onChange={goToPage}
                    itemRender={itemRender}
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
