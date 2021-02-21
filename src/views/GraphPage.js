import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import SelectionMenu from "../components/GraphPage/SelectionMenu";
import {
  getResponseFromSearch,
  getInfoFromResponse,
} from "./../resources/utils/api";

const { Content } = Layout;

const GraphPage = ({ searchTerms, minRank, maxRank }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const [ready, setReady] = useState(true);
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
      <SelectionMenu direction="vertical" />
      <Layout>
        <Content style={{ backgroundColor: "gray" }}>
          <div style={{ height: "100vh", width: "100%" }}>
            Visualization Goes Here
          </div>
        </Content>
        <SelectionMenu direction="horizontal" />
      </Layout>
    </Layout>
  );
};

export default GraphPage;
