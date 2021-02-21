import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

const VisualizeButton = ({ searchTerms, range, studies }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const history = useHistory();

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goToVisualization = () => {
    if (!isNaN(range[0]) && !isNaN(range[1])) {
      history.push(
        `/search/${searchTerms}/visualize/minRank/${range[0]}/maxRank/${range[1]}`
      );
      window.scrollTo(0, 0);
    }
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Tooltip title="Visualize Search Results" placement="bottom">
        <Button
          type="primary"
          icon={<BarChartOutlined />}
          onClick={goToVisualization}
          disabled={studies.length === 0}
        >
          Visualize
        </Button>
      </Tooltip>
    </>
  );
};

export default VisualizeButton;
