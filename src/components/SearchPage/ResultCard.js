import React, { useState } from "react";
import { Modal, Collapse, Empty } from "antd";

const { Panel } = Collapse;

const ResultCard = ({ study }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <div
        className="searchpage-results-card"
        onClick={() => setModalOpen(true)}
      >
        <h5>{study.organization}</h5>
        <h3>{study.briefTitle}</h3>
        <span>{study.briefSummary.substring(0, 500) + "..."}</span>
      </div>
      <Modal
        centered
        title="Study Information"
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        zIndex={2000}
        bodyStyle={{
          height: "60vh",
          overflow: "auto",
        }}
        footer={null}
      >
        <Collapse>
          <Panel header="Full Title" key="1">
            <p>{study.briefTitle}</p>
          </Panel>
          <Panel header="Full Summary" key="2">
            <p>{study.briefSummary}</p>
          </Panel>
          <Panel header="Associated Conditions" key="3">
            {study.condition.length > 0 ? (
              <ul>
                {study.condition.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <Empty />
            )}
          </Panel>
          <Panel header="Associated Keywords" key="4">
            {study.keyword.length > 0 ? (
              <ul>
                {study.keyword.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <Empty />
            )}
          </Panel>
          <Panel header="Relevant Information" key="5">
            <ul>
              <li>
                <b>Enrollment: </b>
                {study.enrollmentCount || "N/A"}
              </li>
              <li>
                <b>Location: </b>
                {`${study.locationCity || "N/A"}, ${
                  study.locationCountry || "N/A"
                }`}
              </li>
              <li>
                <b>Minimum Age: </b>
                {study.minimumAge || "N/A"}
              </li>
              <li>
                <b>Maximum Age: </b>
                {study.maximumAge || "N/A"}
              </li>
              <li>
                <b>Participant Age: </b>
                {study.stdAge.join(", ") || "N/A"}
              </li>
              <li>
                <b>Organization: </b>
                {study.organization || "N/A"}
              </li>
              <li>
                <b>Start Date: </b>
                {study.startDate || "N/A"}
              </li>
              <li>
                <b>End Date: </b>
                {study.endDate || "N/A"}
              </li>
            </ul>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
};

export default ResultCard;
