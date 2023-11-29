import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postStation } from "../../../requests/StationsRequests";
import "../../cards/Window.css";
import "./AddUpdateStation.css";

const AddStation = ({ cancelHandler }) => {
  const dispatch = useDispatch();

  // валидация
  const [nameOk, setNameOk] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    let name = document.getElementById("station-name").value;
    let nameOk = name !== "";

    setNameOk(nameOk);

    if (nameOk) {
      console.log({
        name: name,
      });
      // dispatch(
      //   postStation({
      //     name: name,
      //   })
      // );
      cancelHandler();
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Добавление станции</label>
          <div className="station-input" key={"station-name__container"}>
            <label>Название станции:</label>
            <input
              type="text"
              id={"station-name"}
              className={nameOk ? "base-border" : "error-border"}
            />
          </div>
        </div>
        <div id="buttons">
          <button id="cancel" type="button" onClick={cancelHandler}>
            Отмена
          </button>
          <button type="submit">Подтвердить</button>
        </div>
      </form>
    </div>
  );
};

export default AddStation;
