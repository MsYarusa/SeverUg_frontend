import React from "react";
import "../cards/Window.css";

const UpdateTrip = ({ cancelHandler }) => {
  return (
    <div className="window__container">
      <div className="window">
        <button id="cancel" onClick={cancelHandler}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default UpdateTrip;
