import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";

import "./routesStyles/RouteItem.css";

const RouteItem = ({ data, deleteHandler, updateHandler }) => {
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  let index = 0;
  if (typeof data.id === "string") {
    index = data.id.split(" ")[0];
  } else {
    index = data.id;
  }

  let totalPrice = 0;
  data.price.forEach((item, i, arr) => {
    totalPrice += Number(item);
  });

  let totalTime = 0;
  data.time.forEach((item, i, arr) => {
    totalTime += Number(item);
  });

  let stationsPares = [];

  data.stations.slice(1).forEach((item, i, arr) => {
    const newPair = {
      id: i,
      station1: data.stations[i].name,
      station2: item.name,
      time: getTimeFromMins(Number(data.time[i])),
      price: Number(data.price[i]),
    };
    stationsPares.push(newPair);
  });

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p className="route-index">№{index}</p>
        <p className="route-start">{data.stations.at(0).name}</p>
        <p className="route-dash">—</p>
        <p className="route-destination">{data.stations.at(-1).name}</p>
        <p className="route-totalTime">{getTimeFromMins(totalTime)}</p>
        <p className="route-slash">/</p>
        <p className="route-totalPrice">{totalPrice} руб.</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          {stationsPares?.map((pare) => (
            <div key={pare.id} className="route-station-pare">
              <p className="route-station1">{pare.station1}</p>
              <p className="route-dash">—</p>
              <p className="route-station2">{pare.station2}</p>
              <p className="route-time">{pare.time}</p>
              <p className="route-slash">/</p>
              <p className="route-price">{pare.price} руб.</p>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default RouteItem;

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}
