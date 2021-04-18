import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import SelectionMenu from "../components/GraphPage/SelectionMenu";
import Graph from "../components/GraphPage/Graph";
import {
  getResponseFromSearch,
  getInfoFromResponse,
} from "./../resources/utils/api";

const { Content } = Layout;

const GraphPage = ({ darkMode, searchTerms, minRank, maxRank }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const [graph, setGraph] = useState("line");
  const [dataType, setDataType] = useState("startDate");
  const [ready, setReady] = useState(false);
  const [info, setInfo] = useState({
    totalStudies: 0,
    studiesFound: 0,
    studies: [],
  });

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // call API if search or range changes
  useEffect(() => {
    if (!isNaN(minRank) && !isNaN(maxRank)) {
      setReady(false);
      getResponseFromSearch(searchTerms, minRank, maxRank).then((response) => {
        setInfo(getInfoFromResponse(response));
        setReady(true);
      });
    }
  }, [searchTerms, minRank, maxRank]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <Layout>
      <SelectionMenu direction="vertical" graph={graph} setGraph={setGraph} />
      <Layout>
        <Content>
          <Graph
            darkMode={darkMode}
            ready={ready}
            graph={graph}
            info={info}
            minRank={minRank}
            maxRank={maxRank}
            dataType={dataType}
            setDataType={setDataType}
          />
        </Content>
        <SelectionMenu
          direction="horizontal"
          graph={graph}
          setGraph={setGraph}
        />
      </Layout>
    </Layout>
  );
};

export default GraphPage;
