import React from "react";
import { Button, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";

// TODO: fill in what these buttons actually do

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
