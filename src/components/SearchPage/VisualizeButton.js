import React from "react";
import { Button, Tooltip } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

const VisualizeButton = () => {
  return (
    <>
      <Tooltip title="Visualize Search Results" placement="bottom">
        <Button type="primary" icon={<BarChartOutlined />}>
          Visualize
        </Button>
      </Tooltip>
    </>
  );
};

export default VisualizeButton;
