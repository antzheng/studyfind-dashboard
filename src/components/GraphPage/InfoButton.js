import React, { useState } from "react";
import { Button, Modal, Statistic, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const InfoButton = ({ info, minRank, maxRank, studiesDisplayed }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Button
        className="graphpage-button"
        type="primary"
        icon={<InfoCircleOutlined />}
        onClick={() => setModalOpen(true)}
      >
        Info
      </Button>
      <Modal
        centered
        title="Visualization Summary"
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        zIndex={2000}
        footer={null}
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Statistic title="Studies Visualized" value={studiesDisplayed} />
          </Col>

          <Col span={12}>
            <Statistic title="Studies Returned" value={info.studiesFound} />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Statistic
              title="Current Range of Studies"
              value={`${minRank} - ${maxRank}`}
            />
          </Col>
          <Col span={12}>
            <Statistic title="Available Studies" value={info.totalStudies} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default InfoButton;
