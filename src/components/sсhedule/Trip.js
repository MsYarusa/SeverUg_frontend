import React from "react";
import "./Trip.css";

const Trip = () => {
  return (
    <div className="trip">
      <time>Время</time>
      <p id="destination">Откуда - куда</p>
      <p id="cost">Цена</p>
      <button>Оформить</button>
    </div>
  );
};

export default Trip;
