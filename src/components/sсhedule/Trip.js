import React from "react";
import "./Trip.css";

const Trip = ({ date, from, to }) => {
  return (
    <div className="trip">
      <p id="date">{date}</p>
      <p id="time">00:00</p>
      <p id="current">{from}</p>
      <p id="dash">—</p>
      <p id="destination">{to}</p>
      <p id="cost">цена руб.</p>
      <button>Оформить</button>
    </div>
  );
};

export default Trip;
