import React from "react";
import { Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const InfoButton = () => {
  return (
    <Button
      className="graphpage-button"
      type="primary"
      icon={<InfoCircleOutlined />}
    >
      Info
    </Button>
  );
};

export default InfoButton;
