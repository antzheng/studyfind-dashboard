import React from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

const ExportButton = ({ graphImage, graph, dataType }) => {
  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const saveImage = () => {
    const link = document.getElementById("saveImageLink");
    link.download =
      graph === "map"
        ? "studyfind_mapChart.png"
        : `studyfind_${dataType}_${graph}Chart.png`;
    link.click();
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <Button
      className="graphpage-button"
      type="primary"
      icon={<ExportOutlined />}
      disabled={graphImage === null}
      onClick={saveImage}
    >
      Export
      <a id="saveImageLink" href={graphImage}>
        Save as Image
      </a>
    </Button>
  );
};

export default ExportButton;
