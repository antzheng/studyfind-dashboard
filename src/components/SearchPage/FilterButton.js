import React from "react";
import { Button, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const FilterButton = () => {
  return (
    <>
      <Tooltip title="Filter Search Results" placement="bottom">
        <Button type="primary" icon={<FilterOutlined />}>
          Filter
        </Button>
      </Tooltip>
    </>
  );
};

export default FilterButton;
