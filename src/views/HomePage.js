import React from "react";
import Navbar from "./../components/HomePage/Navbar";
import Logo from "./../components/HomePage/Logo";
import Searchbar from "./../components/HomePage/Searchbar";

const HomePage = (props) => {
  return (
    <>
      <Navbar />
      <div className="homepage-wrapper">
        <Logo />
        <Searchbar keywords={props.keywords} />
      </div>
    </>
  );
};

export default HomePage;
