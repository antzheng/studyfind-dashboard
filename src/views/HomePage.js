import React from "react";
import Navbar from "./../components/HomePage/Navbar";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import StudyFindLogo from "./../styles/assets/images/studyfind.png";

const HomePage = () => {
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
          <Input
            className="homepage-searchbar-input"
            prefix={<SearchOutlined />}
            size="large"
          />
        </div>
        <Button className="homepage-search-button" type="primary">
          Search
        </Button>
      </div>
    </>
  );
};

export default HomePage;
