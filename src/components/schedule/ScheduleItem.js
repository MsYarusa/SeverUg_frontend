import React from "react";
import ObjectItem from "../cards/ObjectItem";
import "./ScheduleItem.css";

const ScheduleItem = ({ data }) => {
  const printDelete = () => {
    console.log("delete");
  };
  const printUpdate = () => {
    console.log("update");
  };

  return (
    <ObjectItem deleteHandler={printDelete} updateHandler={printUpdate}>
      <p id="date">{data.date}</p>
      <p id="time">{data.time_to}</p>
      <p id="current">{data.stations.at(0).name}</p>
      <p id="dash">—</p>
      <p id="destination">{data.stations.at(-1).name}</p>
      <p id="cost">{data.cost} руб.</p>
    </ObjectItem>
  );
};

export default ScheduleItem;
