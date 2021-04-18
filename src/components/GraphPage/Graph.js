import React, { useState, useEffect, useRef } from "react";
import { Spin, Empty } from "antd";
import Chart from "chart.js";
import TitleDropdown from "./TitleDropdown";
import FilterButton from "./FilterButton";
import ExportButton from "./ExportButton";
import StatsCard from "./StatsCard";
import {
  formatLineChart,
  formatPieChart,
  formatBarChart,
  formatWorldMap,
} from "./../../resources/utils/graph";

// chart font styling
Chart.defaults.global.defaultFontFamily = "Avenir";
Chart.defaults.global.defaultFontSize = 15;

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

const Graph = ({
  darkMode,
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
  const [studiesDisplayed, setStudiesDisplayed] = useState(0);
  const [graphImage, setGraphImage] = useState(null);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // resize layout window to fit content automatically
  useEffect(() => {
    // define listener function for resizing
    const listener = () => {
      // find distance from top of last element
      let element = document.querySelectorAll(".graphpage-card");
      element = element[element.length - 1];
      if (!element) {
        element = document.querySelector(".graphpage-filler-container");
      }
      if (element) {
        let top = 0;
        let height = element.offsetHeight;
        while (element) {
          top += element.offsetTop;
          element = element.offsetParent;
        }

        // resize based on position
        document.querySelectorAll(".ant-layout").forEach((node) => {
          node.style.height = `${top + 2 * height}px`;
        });
      }
    };
    setTimeout(listener, 100);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  // set up the chart on the canvas element when component is mounted
  useEffect(() => {
    Chart.defaults.global.defaultFontColor = darkMode ? "#ebebeb" : "#3a3e48";

    if (chartRef.current) {
      // grab the formatted data
      const [numDisplayed, labels, dataset, options] = formatFunctions[graph](
        darkMode,
        info.studies,
        graph === "map" ? "locationCountry" : dataType
      );

      // update studies displayed for statistics
      setStudiesDisplayed(numDisplayed);

      // fill in the canvas
      const canvas = chartRef.current;
      const context = canvas.getContext("2d");
      const chart = new Chart(context, {
        type: graphTypes[graph],
        data: {
          labels: labels,
          datasets: [dataset],
        },
        options: options,
        plugins: [
          {
            afterRender: function (c) {
              // fill in background color of canvas
              const ctx = c.chart.ctx;
              ctx.save();
              ctx.globalCompositeOperation = "destination-over";
              ctx.fillStyle = darkMode ? "#1c1e23" : "white";
              ctx.fillRect(0, 0, c.chart.width, c.chart.height);
              ctx.restore();

              // update state with new image data url
              setGraphImage(
                canvas
                  .toDataURL("image/png")
                  .replace("image/png", "image/octet-stream")
              );
            },
          },
        ],
      });

      // set canvas size
      chart.canvas.parentNode.style.height = "100%";
      chart.canvas.parentNode.style.width = "100%";
      chart.canvas.parentNode.style.maxHeight = "600px";
      chart.canvas.parentNode.style.maxWidth = "900px";

      // destroy canvas on component rerender
      return () => chart.destroy();
    }
  }, [ready, graph, info, dataType, darkMode]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------
  return (
    <>
      <div className="graphpage-content-container">
        <div className="graphpage-toprow-container">
          <div className="graphpage-toprow">
            <TitleDropdown
              darkMode={darkMode}
              graph={graph}
              dataType={dataType}
              setDataType={setDataType}
            />
            <div className="navbar-space" />
            <FilterButton
              darkMode={darkMode}
              minRank={minRank}
              maxRank={maxRank}
              totalStudies={info.totalStudies}
            />
            <ExportButton
              darkMode={darkMode}
              graphImage={graphImage}
              graph={graph}
              dataType={dataType}
              info={info}
              ready={ready}
            />
          </div>
        </div>
        <div className="graphpage-flexrow">
          {ready ? (
            <>
              <div className="canvas-container">
                <canvas id="graph-canvas" ref={chartRef} />
              </div>
              <div className="graphpage-card-column">
                <StatsCard
                  title="Available Studies"
                  value={info.totalStudies}
                />
                <StatsCard title="Studies Returned" value={info.studiesFound} />
                <StatsCard
                  title="Studies Visualized"
                  value={studiesDisplayed}
                />
                <StatsCard
                  title="Studies Queried"
                  value={`${minRank} - ${maxRank}`}
                />
              </div>
            </>
          ) : (
            <div className="graphpage-filler-container">
              {!isNaN(minRank) && !isNaN(maxRank) ? (
                <Spin
                  size="large"
                  tip={`Retrieving ${maxRank - minRank + 1} studies...`}
                />
              ) : (
                <Empty />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Graph;
