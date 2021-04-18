import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Slider, Input, Tooltip } from "antd";
import { FilterFilled } from "@ant-design/icons";

const FilterButton = ({ darkMode, minRank, maxRank, totalStudies }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [minValue, setMinValue] = useState(minRank);
  const [maxValue, setMaxValue] = useState(maxRank);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  // go to new visualization link if range changes
  const goToVisualization = () => {
    const oldURL = history.location.pathname;
    const newURL =
      oldURL.slice(0, oldURL.lastIndexOf("minRank/")) +
      `minRank/${minValue}/maxRank/${maxValue}`;
    if (oldURL !== newURL) history.push(newURL);
    window.scrollTo(0, 0);
    setModalOpen(false);
  };

  // reset range to original and close modal
  const closeModalHandler = () => {
    setMinValue(minRank);
    setMaxValue(maxRank);
    setModalOpen(false);
  };

  // change value using input
  const changeInputValue = (lowerBound, event) => {
    let value = event.target.value;
    if ("1234567890".includes(value[value.length - 1])) {
      value = parseInt(value);
      if (lowerBound && value <= maxValue) {
        setMinValue(value);
      } else if (!lowerBound && value >= minValue && value <= totalStudies) {
        setMaxValue(value);
      }
    }
  };

  // change value using slider
  const changeSliderValue = ([low, high]) => {
    if (minValue !== low) setMinValue(low);
    if (maxValue !== high) setMaxValue(high);
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Tooltip placement="left" title="Filter">
        <Button
          className="graphpage-button"
          type="primary"
          icon={<FilterFilled />}
          onClick={() => setModalOpen(true)}
          shape="circle"
          size="large"
        />
      </Tooltip>
      <Modal
        className={
          darkMode
            ? "dark-mode graphpage-filter-modal"
            : "graphpage-filter-modal"
        }
        centered
        title="Filter Studies Queried"
        visible={modalOpen}
        onOk={goToVisualization}
        onCancel={closeModalHandler}
        zIndex={2000}
        closable={false}
        maskClosable={false}
      >
        <div className="graphpage-filter-input-row">
          <h3>Currently Viewing:</h3>
          <div className="graphpage-range-container">
            <Input
              className="graphpage-filter-input"
              value={minValue}
              onChange={(e) => changeInputValue(true, e)}
            />
            <h3>{" – "}</h3>
            <Input
              className="graphpage-filter-input"
              value={maxValue}
              onChange={(e) => changeInputValue(false, e)}
            />
          </div>
        </div>
        <Slider
          range={true}
          min={1}
          max={totalStudies}
          value={[minValue, maxValue]}
          onChange={changeSliderValue}
        />
      </Modal>
    </>
  );
};

export default FilterButton;
