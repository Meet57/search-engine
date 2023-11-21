import React, { useState } from "react";
import { AutoComplete } from "antd";
import _debounce from "lodash/debounce";
import { useEffect } from "react";

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const SearchBoxComponent = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    debouncedApiCall(value);
  }, [value])

  const debouncedApiCall = _debounce(async (searchText) => {
    try {
      setOptions(!searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)])

      // const response = await fetch(`https://api.example.com/search?q=${searchText}`);
      // const data = await response.json();

      // setOptions(data.map(item => ({ value: item.name })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 1000);

  const onSelect = (data) => {
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
