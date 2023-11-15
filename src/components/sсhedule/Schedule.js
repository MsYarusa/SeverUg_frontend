import React from "react";
import ScheduleFilter from "./ScheduleFilter";
import Trip from "./Trip";

import "./Schedule.css";

const Shedule = (props) => {
  return (
    <div className="schedule">
      <ScheduleFilter />
      <ul>
        {props.schedule?.map((trip) => (
          <Trip
            key={trip.id}
            date={trip.time_to}
            from={trip.stations.at(0).name}
            to={trip.stations.at(-1).name}
          />
        ))}
      </ul>
    </div>
  );
};

export default Shedule;
