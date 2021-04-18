import React from "react";
import Navbar from "./../components/HomePage/Navbar";
import Logo from "./../components/HomePage/Logo";
import Searchbar from "./../components/HomePage/Searchbar";

const HomePage = ({ darkMode, setDarkMode, keywords }) => {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="homepage-wrapper">
        <Logo />
        <Searchbar keywords={keywords} />
      </div>
    </>
  );
};

export default HomePage;
