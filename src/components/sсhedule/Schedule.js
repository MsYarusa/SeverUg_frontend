import React, { useState, useEffect } from "react";
import ScheduleFilter from "./ScheduleFilter";
import Trip from "./Trip";

import "./Schedule.css";

const Shedule = (props) => {
  const [schedule, setSchedule] = useState(props.schedule);

  useEffect(() => {
    setSchedule(props.schedule);
  }, [props.schedule]);

  const SearchData = (searchData) => {
    let search_results = [];

    for (let trip of props.schedule) {
      let tripFrom = trip.stations.at(0).name.toLowerCase();
      let tripTo = trip.stations.at(-1).name.toLowerCase();

      let searchedFrom = tripFrom.indexOf(searchData.from);
      let searchedTo = tripTo.indexOf(searchData.to);

      if (searchedFrom !== -1 && searchedTo !== -1) {
        search_results.push(trip);
      }
    }

    setSchedule(search_results);
  };

  return (
    <div className="schedule">
      <ScheduleFilter getSearchData={SearchData} />
      <ul>
        {schedule?.map((trip) => (
          <Trip
            key={trip.trip_id}
            date={trip.time_to}
            from={trip.stations.at(0).name}
            to={trip.stations.at(-1).name}
          />
        ))}
      </ul>
      {schedule.length === 0 && <p id="message">Рейсов не найдено</p>}
    </div>
  );
};

export default Shedule;
