import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import { useHistory } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const Searchbar = (props) => {
  // -------------------------------------------------------------------
  // ------------------------------ state ------------------------------
  // -------------------------------------------------------------------

  const searchbar = React.createRef();
  const history = useHistory();
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

  const enterSearch = (event) => {
    history.push(`/search/${searchbar.current.state.value}/page/1`);
  };

  // ------------------------------------------------------------------
  // ----------------------------- render -----------------------------
  // ------------------------------------------------------------------

  return (
    <>
      <div className="searchpage-searchbar-div">
        <AutoComplete
          className="searchpage-searchbar-input"
          options={options}
          filterOption={filterOptions}
          defaultValue={props.searchTerms}
          dropdownClassName="searchbar-autocomplete-dropdown"
        >
          <Input
            ref={searchbar}
            style={{ borderRadius: "50px", height: "50px" }}
            suffix={
              <SearchOutlined
                className="searchpage-searchbar-icon"
                onClick={(event) => enterSearch(event)}
              />
            }
            size="large"
            onPressEnter={(event) => enterSearch(event)}
          />
        </AutoComplete>
      </div>
    </>
  );
};

export default Searchbar;
