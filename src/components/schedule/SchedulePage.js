import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "./GetSchedule";

import ScheduleFilter from "./ScheduleFilter";
import ScheduleList from "./ScheduleList";
import "../cards/ObjectPage.css";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);
  const [filteredList, setFilteredList] = useState(schedule);
  const [searchedList, setSearchedList] = useState(schedule);

  useEffect(() => {
    dispatch(getSchedule());
  }, []);

  useEffect(() => {
    setFilteredList(schedule);
    setSearchedList(schedule);
  }, [schedule]);

  useEffect(() => {
    setSearchedList(filteredList);
  }, [filteredList]);

  const searchHandler = (searchConfig) => {
    let search_results = [];

    for (let trip of filteredList) {
      let tripFrom = trip.stations.at(0).name.toLowerCase();
      let tripTo = trip.stations.at(-1).name.toLowerCase();
      let searchedFrom = tripFrom.indexOf(searchConfig.from);
      let searchedTo = tripTo.indexOf(searchConfig.to);

      if (searchedFrom === 0 && searchedTo === 0) {
        search_results.push(trip);
      }
    }

    setSearchedList(search_results);
  };

  const filterHandler = (filterConfig) => {
    // let search_results = [];
    // if (filterConfig.length === 0) {
    //   setFilteredList(employees);
    // } else {
    //   for (let emp of employees) {
    //     for (let role of filterConfig) {
    //       if (emp.role === role) {
    //         search_results.push(emp);
    //         break;
    //       }
    //     }
    //   }
    //   setFilteredList(search_results);
    // }
  };

  const addScheduleHandler = () => {};

  return (
    <div className="page">
      <ScheduleFilter onFilter={filterHandler} />
      <ScheduleList
        searchHandler={searchHandler}
        addScheduleHandler={addScheduleHandler}
        list={searchedList}
      />
    </div>
  );
};

export default SchedulePage;
