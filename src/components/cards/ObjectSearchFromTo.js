import React, { useState } from "react";

import searchImg from "./buttonImgs/search.svg";
import "./objectStyles/ObjectSearch.css";

const SearchFromTo = ({ search }) => {
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const inputFromHandler = (event) => {
    setInputFrom(event.target.value.toLowerCase());
    search({ from: event.target.value.toLowerCase().trim(), to: inputTo });
  };

  const inputToHandler = (event) => {
    setInputTo(event.target.value.toLowerCase());
    search({ from: inputFrom, to: event.target.value.toLowerCase().trim() });
  };

  const clearHandler = () => {
    search({ from: "", to: "" });
    setInputFrom("");
    setInputTo("");
  };

  return (
    <form onSubmit={submitHandler} className="object-search__container">
      <input
        id="from"
        type="text"
        autoComplete="off"
        placeholder="Откуда"
        value={inputFrom}
        onChange={inputFromHandler}
      />
      <input
        id="to"
        type="text"
        autoComplete="off"
        placeholder="Куда"
        value={inputTo}
        onChange={inputToHandler}
      />
      <button id="clear-search" onClick={clearHandler}>
        {inputFrom || inputTo ? <p>Сбросить</p> : <img src={searchImg} />}
      </button>
    </form>
  );
};

export default SearchFromTo;
