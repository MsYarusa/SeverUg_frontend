import React from "react";
import "../cards/Window.css";

const DeleteTrip = ({ cancelHandler }) => {
  const confirmHaldler = () => {
    console.log("confirmed");
    cancelHandler();
  };

  return (
    <div className="window__container">
      <div className="window">
        <p>Подтвердите удаление рейса</p>
        <div id="buttons">
          <button id="cancel" onClick={cancelHandler}>
            Отмена
          </button>
          <button id="confirmation" onClick={confirmHaldler}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrip;
