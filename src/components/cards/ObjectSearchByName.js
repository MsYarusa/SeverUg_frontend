import React, { useState } from "react";

import searchImg from "./buttonImgs/search.svg";
import "./objectStyles/ObjectSearch.css";

const SearchByName = ({ search, placeholder }) => {
  const [inputData, setInputData] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const inputHandler = (event) => {
    search(event.target.value.toLowerCase());
    setInputData(event.target.value);
  };

  const clearHandler = () => {
    search("");
    setInputData("");
  };

  return (
    <form onSubmit={submitHandler} className="object-search__container">
      <input
        id="search"
        type="text"
        autoComplete="off"
        value={inputData}
        placeholder={placeholder}
        onChange={inputHandler}
      />
      <button id="clear" onClick={clearHandler}>
        {inputData ? <p>Сбросить</p> : <img src={searchImg} />}
      </button>
    </form>
  );
};

export default SearchByName;
