import React, { useState, useEffect } from "react";
import { Input, Button, AutoComplete } from "antd";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const Searchbar = ({ keywords }) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const searchbar = React.createRef();
  const history = useHistory();
  const [options, setOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // ------------------------------------------------------------------
  // --------------------------- life-cycle ---------------------------
  // ------------------------------------------------------------------

  // only update full options if keywords ever change
  useEffect(() => {
    setOptions(keywords.map((word) => ({ value: word })));
  }, [keywords]);

  // ------------------------------------------------------------------
  // ---------------------------- handlers ----------------------------
  // ------------------------------------------------------------------

  const filterOptions = (input, option) => {
    return option.value.startsWith(input.toLowerCase().trim());
  };

  const enterSearch = () => {
    const search = searchbar.current.state.value.trim();
    if (search) {
      history.push(`/search/${search}/page/1`);
      window.scrollTo(0, 0);
    }
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <div className="homepage-searchbar-div">
        <AutoComplete
          className="homepage-searchbar-input"
          options={options}
          filterOption={filterOptions}
          dropdownClassName="searchbar-autocomplete-dropdown"
        >
          <Input
            ref={searchbar}
            style={{ borderRadius: isFocused ? "0px" : "50px", height: "50px" }}
            prefix={<SearchOutlined />}
            size="large"
            onPressEnter={(event) => enterSearch(event)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </AutoComplete>
      </div>
      <Button
        className="homepage-search-button"
        type="primary"
        onClick={(event) => enterSearch(event)}
      >
        Search
      </Button>
    </>
  );
};

export default Searchbar;
