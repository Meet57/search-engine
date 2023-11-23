import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import _debounce from "lodash/debounce";

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const SearchBoxComponent = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedApiCall = _debounce(async (searchText) => {
    try {
      setOptions(
        !searchText
          ? []
          : [
              mockVal(searchText),
              mockVal(searchText, 2),
              mockVal(searchText, 3),
            ]
      );

      // const response = await fetch(`https://api.example.com/search?q=${searchText}`);
      // const data = await response.json();

      // Set option me data ko as list of {value:"searchresult"}
      // setOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 1000);

  useEffect(() => {
    debouncedApiCall(value);
    return debouncedApiCall.cancel; // Cleanup the debounce function on component unmount
  }, [value, debouncedApiCall]);

  const onSelect = (data = value) => {
    console.log("onSelect", data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        value={value}
        onChange={(text) => setValue(text)}
        size="large"
        style={{
          width: "100%",
        }}
        onSelect={onSelect}
        placeholder="input here"
      />
    </>
  );
};

export default SearchBoxComponent;
