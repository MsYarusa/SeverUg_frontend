import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { putStation } from "../../../store/requests/StationsRequests";
import { updateStationInRoute } from "../../../store/slicies/routesSlice";
import { updateStationInTrip } from "../../../store/slicies/scheduleSlice";

import "../../cards/objectStyles/Window.css";
import "./stationStyles/AddUpdateStation.css";

const UpdateStation = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      document.getElementById("station-name").value = data.name;
    }
  }, [data]);

  // валидация
  const [nameOk, setNameOk] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    let name = document.getElementById("station-name").value;
    let nameOk = name !== "";
    setNameOk(nameOk);

    if (nameOk) {
      // локально изменяем станции в маршрутах, связанных с этой станцией
      dispatch(updateStationInRoute({ id: data.id, name: name }));
      dispatch(updateStationInTrip({ id: data.id, name: name }));

      dispatch(
        putStation({
          id: data.id,
          name: name,
        })
      );
      cancelHandler();
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Изменение станции</label>
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

export default UpdateStation;
