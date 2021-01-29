import React from "react";
import Navbar from "./../components/HomePage/Navbar";
import Logo from "./../components/HomePage/Logo";
import Searchbar from "./../components/HomePage/Searchbar";

const HomePage = ({ keywords }) => {
  return (
    <>
      <Navbar />
      <div className="homepage-wrapper">
        <Logo />
        <Searchbar keywords={keywords} />
      </div>
    </>
  );
};

export default HomePage;
