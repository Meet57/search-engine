import React, { useState } from "react";
import { Select } from "antd";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const fetch = (value, callback) => {
  console.log(value);

  const staticData = [
    { value: "Software Engineer", text: "Software Engineer" },
    { value: "Data Scientist", text: "Data Scientist" },
    { value: "UX Designer", text: "UX Designer" },
    { value: "Product Manager", text: "Product Manager" },
    { value: "Marketing Specialist", text: "Marketing Specialist" },
  ];

  setTimeout(() => {
    callback(staticData);
  }, 300);
};

const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  // Debounce the handleSearch function
  const debouncedHandleSearch = debounce((newValue) => {
    fetch(newValue, setData);
    setValue(newValue)
  }, 1000);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Select
      showSearch
      size="large"
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      allowClear={true}
      defaultActiveFirstOption={false}
      onSearch={debouncedHandleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const SearchBoxComponent = () => (
  <>
    <SearchInput
      placeholder="Enter the Job you are searching for"
      className="w-100"
      style={{ width: "100%" }}
    />
  </>
);

export default SearchBoxComponent;
