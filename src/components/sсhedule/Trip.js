import React from "react";
import "./Trip.css";

const Trip = (props) => {
  return (
    <div className="trip">
      <p id="date">{props.date}</p>
      <p id="time">00:00</p>
      <p id="current">{props.from}</p>
      <p id="dash">—</p>
      <p id="destination">{props.to}</p>
      <p id="cost">цена руб.</p>
      <button>Оформить</button>
    </div>
  );
};

export default Trip;
