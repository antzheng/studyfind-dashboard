import React from "react";
import { Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

const ExportButton = () => {
  return (
    <Button
      className="graphpage-button"
      type="primary"
      icon={<ExportOutlined />}
      disabled
    >
      Export
    </Button>
  );
};

export default ExportButton;
