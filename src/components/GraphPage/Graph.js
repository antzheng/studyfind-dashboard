import React, { useEffect, useRef } from "react";
import { Spin, Empty } from "antd";
import Chart from "chart.js";
import {
  formatLineChart,
  formatPieChart,
  formatBarChart,
  formatWorldMap,
} from "./../../resources/utils/graph";

const Graph = ({ ready, graph, info, minRank, maxRank }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const chartRef = useRef();

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // set up the chart on the canvas element when component is mounted
  useEffect(() => {
    if (chartRef.current) {
      // specify graph type for chart.js
      const graphTypes = {
        line: "line",
        pie: "pie",
        bar: "horizontalBar",
        map: "choropleth",
      };

      // specify data to be shown on each graph
      const dataTypes = {
        line: "startDate",
        pie: "stdAge",
        bar: "endDate",
        map: "locationCountry",
      };

      // specify format functions for each graph
      const formatFunctions = {
        line: formatLineChart,
        pie: formatPieChart,
        bar: formatBarChart,
        map: formatWorldMap,
      };

      // grab the formatted data
      const [numDisplayed, labels, dataset, options] = formatFunctions[graph](
        info.studies,
        dataTypes[graph]
      );

      // debugging number of studies actually displayed
      console.log("Numnber of displayed studies: " + numDisplayed);

      // fill in the canvas
      const context = chartRef.current.getContext("2d");
      const chart = new Chart(context, {
        type: graphTypes[graph],
        data: {
          labels: labels,
          datasets: [dataset],
        },
        options: options,
      });
      chart.canvas.parentNode.style.height = "65%";
      chart.canvas.parentNode.style.width = "95%";
      return () => chart.destroy();
    }
  }, [ready, graph, info]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------
  return (
    <div className="graphpage-content-container">
      <div className="graphpage-flexrow">
        <h1 className="graphpage-title">{`${graph} Chart`}</h1>
      </div>
      <div className="graphpage-flexrow">
        {ready ? (
          <canvas id="graph-canvas" ref={chartRef} />
        ) : (
          <>
            {!isNaN(minRank) && !isNaN(maxRank) ? (
              <Spin
                size="large"
                tip={`Retrieving ${maxRank - minRank + 1} studies...`}
              />
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Graph;
