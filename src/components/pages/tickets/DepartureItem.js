import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";
import {
  sum,
  getMinsFromTime,
  getTimeFromMins,
} from "../../../extraFunctions/ExtraFunctions";
import { translateDepStatus } from "../../../extraFunctions/Translators";

import "./ticketStyles/DeparturesItem.css";
import "../schedule/scheduleStyles/ScheduleItem.css";

const DeparturesItem = ({ data, onBuy }) => {
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  // Обработка нажатия на кнопку оформления
  const buyHandler = (event) => {
    event.stopPropagation();
    if (data.status === "active" && +accurateDate - 108000 >= +new Date()) {
      onBuy(data);
    }
  };

  // Преобразованния данных отбытия для отображения
  let totalCost = sum(data.trip.road.cost);
  let accurateDate = new Date(+data.date);
  const [hours, mins] = data.trip.departure_time.split(":");
  accurateDate.setHours(Number(hours), Number(mins));

  let arrivalTime =
    sum(data.trip.road.time) + getMinsFromTime(data.trip.departure_time);
  arrivalTime = getTimeFromMins(
    arrivalTime - Math.floor(arrivalTime / 1440) * 1440
  );

  let stationsPares = [];

  data.trip.road.stations.slice(1).forEach((item, i, arr) => {
    let arrTime =
      sum(data.trip.road.time.slice(0, i + 1)) +
      getMinsFromTime(data.trip.departure_time);
    arrTime = getTimeFromMins(arrTime - Math.floor(arrTime / 1440) * 1440);
    const newPair = {
      id: i,
      station1: data.trip.road.stations[i].name,
      station2: item.name,
      dep_time: getTimeFromMins(
        sum(data.trip.road.time.slice(0, i)) +
          getMinsFromTime(data.trip.departure_time)
      ),
      arr_time: arrTime,
      cost: sum(data.trip.road.cost.slice(0, i + 1)),
    };
    stationsPares.push(newPair);
  });

  return (
    <>
      <ObjectItem onClick={infoHandler} id={data.id}>
        <p className="departure-departure-time">
          {data.trip.departure_time} / {arrivalTime}
        </p>
        <p className="departure-departure">
          {data.trip.road.stations.at(0).name}
        </p>
        <p className="departure-dash">—</p>
        <p className="departure-destination">
          {data.trip.road.stations.at(-1).name}
        </p>
        <p className="departure-cost">{totalCost} руб.</p>

        <button
          id={"buy " + data.id + " " + data.trip.id}
          onClick={buyHandler}
          className={
            data.status === "active" && +accurateDate - 108000 >= +new Date()
              ? "buy-button"
              : "buy-button-unactive"
          }
        >
          Оформить
        </button>
      </ObjectItem>
      <div className="info">
        {info && (
          <ul className="departure-list__container">
            {stationsPares?.map((pare) => (
              <div key={pare.id} className="departure-station-pare">
                <p className="departure-info-time">
                  {pare.dep_time} / {pare.arr_time}
                </p>
                <p className="departure-info-station1">{pare.station1}</p>
                <p className="departure-info-dash">—</p>
                <p className="departure-info-station2">{pare.station2}</p>
                <p className="departure-info-cost">{pare.cost} руб.</p>
              </div>
            ))}
          </ul>
        )}
        <div className="departure-info__container">
          <p className="departure-status-label">статус:</p>
          <p className="departure-status">{translateDepStatus(data.status)}</p>
          <p className="departure-places-label">свободных мест:</p>
          <p className="departure-places">
            {data.status === "active"
              ? data.trip.bus.number_of_sits - data.tickets.length
              : 0}
          </p>
        </div>
      </div>
    </>
  );
};

export default DeparturesItem;
