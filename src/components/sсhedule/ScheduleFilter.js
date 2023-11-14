import React from "react";
import "./ScheduleFilter.css";

const ScheduleFilter = () => {
  return (
    <div className="schedule-filter">
      <div>
        <p>от:</p>
        <input></input>
      </div>
      <div>
        <p>до:</p>
        <input></input>
      </div>
      <button>Найти</button>
    </div>
  );
};

export default ScheduleFilter;
