import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "./ScheduleApi/GetSchedule";

import ScheduleFilter from "./ScheduleFilter";
import ScheduleList from "./ScheduleList";
import "../cards/ObjectPage.css";
import AddTrip from "./AddTrip";
import UpdateTrip from "./UpdateTrip";
import DeleteTrip from "./DeleteTrip";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);
  const [filteredList, setFilteredList] = useState(schedule);
  const [searchedList, setSearchedList] = useState(schedule);
  const [addTrip, setAddTrip] = useState(false);
  const [updateTrip, setUpdateTrip] = useState(false);
  const [deleteTrip, setDeleteTrip] = useState(false);

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
    console.log(filterConfig);
    let filter_results = [];
    for (let trip of schedule) {
      let costOk =
        filterConfig.cost.from <= trip.price &&
        trip.price <= filterConfig.cost.to;

      let [hours, mins] = trip.time_to.split(":");
      let time = Number(hours) + Number(mins) / 100;
      let timeOk =
        filterConfig.time.from <= time && time <= filterConfig.time.to;

      let dateOk = filterConfig.days.length === 0;

      for (let day of filterConfig.days) {
        dateOk = trip.days.indexOf(day) !== -1 || dateOk;
      }

      console.log(" dateOk ", dateOk, " timeOk ", timeOk, " costOk ", costOk);
      if (dateOk && timeOk && costOk) {
        filter_results.push(trip);
      }
    }

    setFilteredList(filter_results);
  };

  const addTripHandler = () => {
    setAddTrip(true);
  };

  const updateTripHandler = () => {
    setUpdateTrip(true);
  };

  const deleteTripHandler = () => {
    setDeleteTrip(true);
  };

  const cancelAddHandler = () => {
    setAddTrip(false);
  };

  const cancelUpdateHandler = () => {
    setUpdateTrip(false);
  };

  const cancelDeleteHandler = () => {
    setDeleteTrip(false);
  };

  return (
    <div className="page">
      <ScheduleFilter onFilter={filterHandler} />
      <ScheduleList
        searchHandler={searchHandler}
        buttonsHandlers={{
          add: addTripHandler,
          update: updateTripHandler,
          delete: deleteTripHandler,
        }}
        list={searchedList}
      />
      {addTrip && <AddTrip cancelHandler={cancelAddHandler} />}
      {updateTrip && <UpdateTrip cancelHandler={cancelUpdateHandler} />}
      {deleteTrip && <DeleteTrip cancelHandler={cancelDeleteHandler} />}
    </div>
  );
};

export default SchedulePage;
