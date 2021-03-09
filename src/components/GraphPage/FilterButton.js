import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form, InputNumber } from "antd";
import { FilterOutlined } from "@ant-design/icons";

const FilterButton = ({ minRank, maxRank }) => {
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

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Button
        className="graphpage-button"
        type="primary"
        icon={<FilterOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Filter
      </Button>
      <Modal
        centered
        title="Filter Range of Studies"
        visible={modalOpen}
        onOk={goToVisualization}
        onCancel={closeModalHandler}
        zIndex={2000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="default"
        >
          <Form.Item label="Min Rank:">
            <InputNumber
              value={minValue}
              min={1}
              onChange={(val) => setMinValue(val || 1)}
            />
          </Form.Item>
          <Form.Item label="Max Rank:">
            <InputNumber
              value={maxValue}
              min={minValue}
              onChange={(val) => setMaxValue(val || minValue)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FilterButton;
