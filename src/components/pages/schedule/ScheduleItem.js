import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";
import {
  sum,
  getMinsFromTime,
  getTimeFromMins,
} from "../../../extraFunctions/ExtraFunctions";

import "./scheduleStyles/ScheduleItem.css";

const ScheduleItem = ({ data, deleteHandler, updateHandler }) => {
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  let totalCost = sum(data.road.cost);

  let arrivalTime = sum(data.road.time) + getMinsFromTime(data.departure_time);
  arrivalTime = getTimeFromMins(
    arrivalTime - Math.floor(arrivalTime / 1440) * 1440
  );

  let stationsPares = [];

  data.road.stations.slice(1).forEach((item, i, arr) => {
    let arrTime =
      sum(data.road.time.slice(0, i + 1)) +
      getMinsFromTime(data.departure_time);
    arrTime = getTimeFromMins(arrTime - Math.floor(arrTime / 1440) * 1440);
    const newPair = {
      id: i,
      station1: data.road.stations[i].name,
      station2: item.name,
      dep_time: getTimeFromMins(
        sum(data.road.time.slice(0, i)) + getMinsFromTime(data.departure_time)
      ),
      arr_time: arrTime,
      cost: sum(data.road.cost.slice(0, i + 1)),
    };
    stationsPares.push(newPair);
  });

  let days = daysToString(data.days);

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p className="trip-date">{days}</p>
        <p className="trip-departure-time">
          {data.departure_time} / {arrivalTime}
        </p>
        <p className="trip-departure">{data.road.stations.at(0).name}</p>
        <p className="trip-dash">—</p>
        <p className="trip-destination">{data.road.stations.at(-1).name}</p>
        <p className="trip-cost">{totalCost} руб.</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          {stationsPares?.map((pare) => (
            <div key={pare.id} className="trip-station-pare">
              <p className="trip-time">
                {pare.dep_time} / {pare.arr_time}
              </p>
              <p className="trip-station1">{pare.station1}</p>
              <p className="trip-dash">—</p>
              <p className="trip-station2">{pare.station2}</p>
              <p className="trip-cost">{pare.cost} руб.</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default ScheduleItem;

const daysToString = (data) => {
  const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  let step1 = [...data];
  step1.forEach((item, i, arr) => {
    arr[i] = item === 0 ? 7 : item;
  });
  step1.sort();

  let step2 = [];

  step1.forEach((item, i, arr) => {
    if (i === 0) {
    } else if (arr[i - 1] === item - 1) {
      step2.push("-");
    } else {
      step2.push(" ");
    }
    step2.push(weekDays[item - 1]);
    // ПН-ВТ-СР ПТ-СБ
  });

  let result = "";

  step2.forEach((item, i, arr) => {
    if (i + 1 === arr.length) {
      result = result + item;
    } else if (i === 0) {
      result = item + arr[i + 1];
    } else if (i % 2 === 0) {
      if (arr[i - 1] !== "-" || arr[i + 1] !== "-") {
        result = result + item + arr[i + 1];
      }
    }
  });
  return result;
};
