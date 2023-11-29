import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedule } from "../../../requests/SheduleRequests";
import { getRoutes } from "../../../requests/RoutesRequests";

import ScheduleFilter from "./ScheduleFilter";
import ScheduleList from "./ScheduleList";
import "../../cards/ObjectPage.css";
import AddTrip from "./AddTrip";
import UpdateTrip from "./UpdateTrip";
import DeleteTrip from "./DeleteTrip";

let savedFilteredConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: Number.MAX_SAFE_INTEGER },
  days: [],
};

const SchedulePage = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule.schedule);
  const routes = useSelector((state) => state.routes.routes);

  const [addTrip, setAddTrip] = useState(false);
  const [updateTrip, setUpdateTrip] = useState(false);
  const [deleteTrip, setDeleteTrip] = useState(false);
  const [deleteTripById, setDeleteTripById] = useState(-1);
  const [updateTripById, setUpdateTripById] = useState(null);

  useEffect(() => {
    if (routes.length === 0) {
      dispatch(getRoutes());
    }
    if (schedule.length === 0) {
      dispatch(getSchedule());
    }
  }, [dispatch]);

  const [filteredList, setFilteredList] = useState(schedule);
  const [searchedList, setSearchedList] = useState(schedule);

  useEffect(() => {
    setFilteredList(schedule);
    setSearchedList(schedule);
  }, [schedule]);

  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  const searchHandler = (searchConfig) => {
    let search_results = [];
    for (let trip of schedule) {
      let from =
        searchConfig.from === ""
          ? trip.road.stations.at(0).name.toLowerCase()
          : searchConfig.from;
      let to =
        searchConfig.to === ""
          ? trip.road.stations.at(-1).name.toLowerCase()
          : searchConfig.to;

      // проверяем на совпадение с начальными станциями
      let fromTrips = [];
      trip.road.stations.slice(0, -1).forEach((item, i, arr) => {
        let tripFrom = item.name.toLowerCase();
        let searchedFrom = tripFrom.indexOf(from);
        if (searchedFrom === 0) {
          let newRoute = {
            id: trip.road.id + " from" + item.name,
            price: trip.road.price.slice(i),
            time: trip.road.time.slice(i),
            stations: trip.road.stations.slice(i),
          };
          let newTrip = {
            id: trip.id,
            departure_time: getTimeFromMins(
              sum(trip.road.time.slice(0, i)) +
                getMinsFromTime(trip.departure_time)
            ),
            days: trip.days,
            driver: trip.driver,
            road: newRoute,
          };
          fromTrips.push(newTrip);
        }
      });

      // проверяем на совпадение с конечными станциями
      let newTrips = [];
      for (let fromTrip of fromTrips) {
        fromTrip.road.stations?.slice(1).forEach((item, i, arr) => {
          let tripTo = item.name.toLowerCase();
          let searchedTo = tripTo.indexOf(to);
          if (searchedTo === 0) {
            let newRoute = {
              id: fromTrip.road.id + "to" + item.name,
              price: fromTrip.road.price.slice(0, i + 1),
              time: fromTrip.road.time.slice(0, i + 1),
              stations: fromTrip.road.stations.slice(0, i + 2),
            };
            let newTrip = {
              id: fromTrip.id + " T",
              departure_time: fromTrip.departure_time,
              days: fromTrip.days,
              driver: fromTrip.driver,
              road: newRoute,
            };
            newTrips.push(newTrip);
          }
        });
      }
      // сохраняем подходящие результаты
      search_results = [...search_results, ...newTrips];
    }

    setSearchedList(search_results);
  };

  const filterHandler = (filterConfig) => {
    let filter_results = [];
    savedFilteredConfig = filterConfig;
    for (let trip of searchedList) {
      let tripTotalPrice = sum(trip.road.price);
      let costOk =
        filterConfig.cost.from <= tripTotalPrice &&
        tripTotalPrice <= filterConfig.cost.to;

      let tripTotalTime = getMinsFromTime(trip.departure_time);
      let timeOk =
        filterConfig.time.from <= tripTotalTime &&
        tripTotalTime <= filterConfig.time.to;

      let dateOk = filterConfig.days.length === 0;

      for (let day of filterConfig.days) {
        dateOk = trip.days.indexOf(day) !== -1 || dateOk;
      }

      if (dateOk && timeOk && costOk) {
        filter_results.push(trip);
      }
    }

    setFilteredList(filter_results);
  };

  const addTripHandler = () => {
    setAddTrip(true);
  };

  const updateTripHandler = (id) => {
    let trip = null;
    for (let t of schedule) {
      if (t.id == id) {
        trip = t;
        break;
      }
    }
    setUpdateTripById(trip);
    setUpdateTrip(true);
  };

  const deleteTripHandler = (id) => {
    setDeleteTripById(id);
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
        list={filteredList}
      />
      {addTrip && <AddTrip cancelHandler={cancelAddHandler} />}
      {updateTrip && (
        <UpdateTrip cancelHandler={cancelUpdateHandler} data={updateTripById} />
      )}
      {deleteTrip && (
        <DeleteTrip cancelHandler={cancelDeleteHandler} id={deleteTripById} />
      )}
    </div>
  );
};

export default SchedulePage;

function sum(array) {
  let totalPrice = 0;
  array.forEach((item, i, arr) => {
    totalPrice += Number(item);
  });
  return totalPrice;
}

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}

function getMinsFromTime(time) {
  const [hours, minutes] = time.split(":");
  return Number(hours) * 60 + Number(minutes);
}
