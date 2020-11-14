import React from "react";
import StudyFindLogo from "./../../styles/assets/images/studyfind.png";

const Logo = () => {
  return (
    <>
      <img
        className="homepage-studyfind-logo"
        src={StudyFindLogo}
        alt="studyfind"
      />
      <div className="homepage-app-name">
        <h1>StudyFind Dashboard</h1>
      </div>
    </>
  );
};

export default Logo;
