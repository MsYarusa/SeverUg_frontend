import React from "react";
import ScheduleFilter from "./ScheduleFilter";
import Trip from "./Trip";

import "./Schedule.css";

const Shedule = () => {
  return (
    <div className="schedule">
      <ScheduleFilter />
      <div>
        <Trip />
      </div>
    </div>
  );
};

export default Shedule;
