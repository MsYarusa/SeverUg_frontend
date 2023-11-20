import React, { useState } from "react";
import "./ScheduleFilter.css";

const ScheduleFilter = (props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const changeFromHandler = (event) => {
    setFrom(event.target.value);
  };

  const changeToHandler = (event) => {
    setTo(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let searchData = {
      from: from.toLowerCase(),
      to: to.toLowerCase(),
    };

    props.getSearchData(searchData);
  };

  return (
    <div className="schedule-filter">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="from">от:</label>
          <input type="text" id="from" onChange={changeFromHandler}></input>
        </div>
        <div>
          <label htmlFor="to">до:</label>
          <input type="text" id="to" onChange={changeToHandler}></input>
        </div>

        <button type="submit">Найти</button>
      </form>
    </div>
  );
};

export default ScheduleFilter;
