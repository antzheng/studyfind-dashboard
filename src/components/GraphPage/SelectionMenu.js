import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const { Sider, Footer } = Layout;

const MenuOptions = ({ mode, selectedKey, setGraph }) => {
  return (
    <Menu
      theme="dark"
      selectedKeys={[selectedKey]}
      mode={mode}
      onSelect={({ key }) => setGraph(key)}
    >
      <Menu.Item
        key="line"
        icon={<LineChartOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "Line Chart" : ""}
      </Menu.Item>
      <Menu.Item
        key="pie"
        icon={<PieChartOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "Pie Chart" : ""}
      </Menu.Item>
      <Menu.Item
        key="bar"
        icon={<BarChartOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "Bar Chart" : ""}
      </Menu.Item>
      <Menu.Item
        key="map"
        icon={<CompassOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "World Map" : ""}
      </Menu.Item>
    </Menu>
  );
};

const SelectionMenu = ({ direction, graph, setGraph }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [siderVisible, setSiderVisible] = useState(false);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // set sider vs footer visibility based on screen width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setSiderVisible(!mediaQuery.matches);
    const handleChange = () => setSiderVisible(!mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const goHome = () => {
    history.push("/");
    window.scrollTo(0, 0);
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      {direction === "vertical" ? (
        <>
          {siderVisible ? (
            <Sider
              className={
                menuOpen
                  ? "graphpage-sider"
                  : "graphpage-sider graphpage-sider-collapsed"
              }
              collapsed={!menuOpen}
              collapsible
              onCollapse={(collapsed) => setMenuOpen(!collapsed)}
            >
              <div className="graphpage-menu-logo" onClick={goHome}>
                <img src={StudyFindLogo} alt="studyfind" />
                <h2>{menuOpen ? "StudyFind" : "..."}</h2>
              </div>
              <MenuOptions
                mode="inline"
                selectedKey={graph}
                setGraph={setGraph}
              />
            </Sider>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {!siderVisible ? (
            <Footer className="graphpage-footer">
              <MenuOptions
                mode="horizontal"
                selectedKey={graph}
                setGraph={setGraph}
              />
            </Footer>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default SelectionMenu;
