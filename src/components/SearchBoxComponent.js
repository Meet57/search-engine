import React,{useEffect,useState} from "react";
import {Select} from "antd";

const debounce=(func,delay) => {
  let timeoutId;
  return function(...args) {
    if(timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId=setTimeout(() => {
      func(...args);
    },delay);
  };
};

const fetch=(value,callback) => {
  const staticData=[
    {value: "Software Engineer",text: "Software Engineer"},
    {value: "Data Scientist",text: "Data Scientist"},
    {value: "UX Designer",text: "UX Designer"},
    {value: "Product Manager",text: "Product Manager"},
    {value: "Marketing Specialist",text: "Marketing Specialist"},
  ];

  setTimeout(() => {
    callback(staticData);
  },300);
};

const SearchInput=(props) => {
  const [data,setData]=useState([]);
  const [value,setValue]=useState(props.searchQuery);

  // Debounce the handleSearch function
  const debouncedHandleSearch=debounce((newValue) => {
    fetch(newValue,setData);
    setValue(newValue);
    props.setSearchQuery(newValue);
  },1000);

  const handleChange=(newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleSelect=(newValue) => {
    props.setSearchQuery(newValue);
    setValue(newValue);
    props.setClicked(true); // Set clicked to true when a suggestion is selected
  };

  return (
    <Select
      showSearch
      size="large"
      value={value}
      placeholder={value===""? props.placeholder:undefined} // Use undefined instead of null
      style={props.style}
      allowClear={true}
      defaultActiveFirstOption={false}
      onSearch={debouncedHandleSearch}
      onChange={handleChange}
      onSelect={handleSelect}
      notFoundContent={null}
      options={(data||[]).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

const SearchBoxComponent=(props) => {
  const {searchQuery,setSearchQuery}=props;
  console.log(searchQuery,setSearchQuery)
  return (
    <>
      <SearchInput
        placeholder="Enter the Job you are searching for"
        className="w-100"
        style={{width: `${props.width}`}}
        setClicked={props.setClicked}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </>
  )
};

export default SearchBoxComponent;
