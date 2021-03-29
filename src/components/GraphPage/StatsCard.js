import React from "react";
import { Statistic } from "antd";

const StatsCard = ({ title, value }) => (
  <div className="graphpage-card">
    <Statistic title={title} value={value} />
  </div>
);

export default StatsCard;
