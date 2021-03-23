import React, { useState } from "react";
import { Button, Modal, Statistic, Row, Col } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const AboutButton = ({ info, studies, pageNumber }) => {
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
        type="primary"
        icon={<InfoCircleOutlined />}
        onClick={() => setModalOpen(true)}
        disabled={studies[(pageNumber - 1) % 100] === undefined}
      >
        About
      </Button>
      <Modal
        centered
        title="Search Results Summary"
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        zIndex={2000}
        footer={null}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Available Studies" value={info.totalStudies} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Currently Viewing"
              value={`${pageNumber * 10 - 9} - ${Math.min(
                pageNumber * 10,
                info.totalStudies
              )}`}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AboutButton;
