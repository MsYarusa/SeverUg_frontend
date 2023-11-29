import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";
import "./ScheduleItem.css";

const ScheduleItem = ({ data, deleteHandler, updateHandler }) => {
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  let days = daysToString(data.days);

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p id="date">{days}</p>
        <p id="time">{data.time_to}</p>
        <p id="current">{data.stations.at(0).name}</p>
        <p id="dash">—</p>
        <p id="destination">{data.stations.at(-1).name}</p>
        <p id="cost">{data.price} руб.</p>
      </ObjectItem>
      {info && (
        <ul id="stations">
          {data.stations?.map((station) => (
            <p key={station.name}>{station.name}</p>
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
