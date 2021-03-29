import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

const graphTitles = {
  startDate: "Start Date",
  stdAge: "Age Group",
  endDate: "End Date",
};

const DropdownMenu = ({ dataType, setDataType }) => {
  return (
    <Menu>
      {Object.entries(graphTitles)
        .filter(([key]) => key !== dataType)
        .map(([key, value]) => (
          <Menu.Item key={key} onClick={() => setDataType(key)}>
            {value}
          </Menu.Item>
        ))}
    </Menu>
  );
};

const TitleDropdown = ({ graph, dataType, setDataType }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const [menuOpen, setMenuOpen] = useState(false);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // close the menu if user scrolls
  useEffect(() => {
    const listener = () => {
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, [menuOpen]);

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <h1 className="graphpage-title">
      {"Studies By "}
      <Dropdown
        trigger={["click"]}
        visible={menuOpen}
        onVisibleChange={(status) => setMenuOpen(status)}
        overlay={
          graph === "map" ? (
            <></>
          ) : (
            <DropdownMenu dataType={dataType} setDataType={setDataType} />
          )
        }
        overlayStyle={
          graph === "map"
            ? {}
            : {
                boxShadow: "0px 0px 0px 1px rgba(0,0,0,0.2)",
                width: "200px",
                position: "fixed",
              }
        }
        placement="bottomCenter"
      >
        <span className="graphpage-dropdown">
          {`${graph === "map" ? "Country" : graphTitles[dataType]} `}
          {graph === "map" ? (
            <></>
          ) : (
            <DownOutlined className="graphpage-dropdown-icon" />
          )}
        </span>
      </Dropdown>
    </h1>
  );
};

export default TitleDropdown;
