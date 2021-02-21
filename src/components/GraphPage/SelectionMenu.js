import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  LineChartOutlined,
  CompassOutlined,
} from "@ant-design/icons";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const { Sider, Footer } = Layout;

const MenuOptions = ({ mode }) => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode={mode}>
      <Menu.Item
        key="1"
        icon={<LineChartOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "Line Chart" : ""}
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<PieChartOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "Pie Chart" : ""}
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<CompassOutlined className="graphpage-menu-item-icon" />}
      >
        {mode === "inline" ? "World Map" : ""}
      </Menu.Item>
    </Menu>
  );
};

const SelectionMenu = ({ direction }) => {
  // ------------------------------------------------------------------
  // ----------------------------- state ------------------------------
  // ------------------------------------------------------------------

  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(true);
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
              className="graphpage-sider"
              collapsible
              collapsed={!menuOpen}
              onCollapse={(collapsed) => setMenuOpen(!collapsed)}
            >
              <div className="graphpage-menu-logo" onClick={goHome}>
                <img src={StudyFindLogo} alt="studyfind" />
                <h2 className={menuOpen ? null : "graphpage-menu-collapsed"}>
                  {menuOpen ? "StudyFind" : "..."}
                </h2>
              </div>
              <MenuOptions mode="inline" />
            </Sider>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {!siderVisible ? (
            <Footer className="graphpage-footer">
              <MenuOptions mode="horizontal" />
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
