import React, { useState, useEffect } from "react";
import Navbar from "./../components/HomePage/Navbar";
import { Input, Button, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StudyFindLogo from "./../styles/assets/images/studyfind.png";

const HomePage = (props) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const [options, setOptions] = useState([]);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // only update full options if keywords ever change
  useEffect(() => {
    setOptions(props.keywords.map((word) => ({ value: word })));
  }, [props.keywords]);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const filterOptions = (input, option) => {
    return option.value.startsWith(input.toLowerCase());
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <Navbar />
      <div className="homepage-wrapper">
        <img
          className="homepage-studyfind-logo"
          src={StudyFindLogo}
          alt="studyfind"
        />
        <div className="homepage-app-name">
          <h1>StudyFind Dashboard</h1>
        </div>
        <div className="homepage-searchbar-div">
          <AutoComplete
            className="homepage-searchbar-input"
            options={options}
            filterOption={filterOptions}
          >
            <Input
              style={{ borderRadius: "50px", height: "50px" }}
              prefix={<SearchOutlined />}
              size="large"
            />
          </AutoComplete>
        </div>
        <Button className="homepage-search-button" type="primary">
          Search
        </Button>
      </div>
    </>
  );
};

export default HomePage;
