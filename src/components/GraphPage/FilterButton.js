import React from "react";
import { Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const FilterButton = () => {
  return (
    <Button
      className="graphpage-button"
      type="primary"
      icon={<FilterOutlined />}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
