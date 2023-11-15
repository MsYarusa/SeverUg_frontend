import React from "react";
import "./ScheduleFilter.css";

const ScheduleFilter = () => {
  return (
    <div className="schedule-filter">
      <form>
        <div>
          <label htmlFor="from">от:</label>
          <input id="from"></input>
        </div>
        <div>
          <label htmlFor="to">до:</label>
          <input id="to"></input>
        </div>

        <button>Найти</button>
      </form>
    </div>
  );
};

export default ScheduleFilter;
