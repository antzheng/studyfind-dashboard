import React, { useEffect, useRef } from "react";
import { Spin, Empty } from "antd";
import Chart from "chart.js";
import InfoButton from "./InfoButton";
import FilterButton from "./FilterButton";
import {
  formatLineChart,
  formatPieChart,
  formatBarChart,
  formatWorldMap,
} from "./../../resources/utils/graph";

// chart font styling
Chart.defaults.global.defaultFontFamily = "Avenir";
Chart.defaults.global.defaultFontSize = 15;

const Graph = ({
  ready,
  graph,
  info,
  minRank,
  maxRank,
  dataType,
  setDataType,
}) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const chartRef = useRef();
  const graphTitles = {
    startDate: "Studies by Start Date",
    stdAge: "Studies by Age Group",
    endDate: "Studies by End Date",
    locationCountry: "Studies by Country",
  };

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
        graph === "map" ? "locationCountry" : dataType
      );

      // debugging number of studies actually displayed
      console.log("Number of displayed studies: " + numDisplayed);

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

      // set canvas size
      chart.canvas.parentNode.style.height = `${window.innerHeight * 0.75}px`;
      chart.canvas.parentNode.style.width = "95%";
      chart.canvas.parentNode.style.maxHeight = "600px";
      chart.canvas.parentNode.style.maxWidth = "800px";

      // destroy canvas on component rerender
      return () => chart.destroy();
    }
  }, [ready, graph, info, dataType]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------
  return (
    <>
      <div className="graphpage-content-container">
        <div className="graphpage-flexrow">
          <h1 className="graphpage-title">
            {graph === "map"
              ? graphTitles.locationCountry
              : graphTitles[dataType]}
          </h1>
        </div>
        <div className="graphpage-flexrow">
          {ready ? (
            <div className="graphpage-flexcol">
              <div className="canvas-container">
                <canvas id="graph-canvas" ref={chartRef} />
              </div>
              <div
                className="graphpage-flexrow"
                style={{ width: "170px", justifyContent: "space-between" }}
              >
                <InfoButton />
                <FilterButton />
              </div>
            </div>
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
      <div style={{ height: "60px" }} />
    </>
  );
};

export default Graph;
