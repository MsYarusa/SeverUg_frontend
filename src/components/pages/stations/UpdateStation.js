import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putStation } from "../../../requests/StationsRequests";
import { updateRoute } from "../../../store/routesSlice";
import "../../cards/Window.css";
import "./AddUpdateStation.css";

const UpdateStation = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();
  const routes = useSelector((state) => state.routes.routes);

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
      let routesWithStation = [];
      for (let route of routes) {
        if (route.stations.find((station) => station.id === data.id)) {
          routesWithStation.push(route);
        }
      }

      for (let route of routesWithStation) {
        route.stations.forEach((item, i, arr) => {
          if (item.id === data.id) {
            arr[i].name = name;
          }
        });

        const NewRoute = {
          id: route.id,
          price: route.price,
          time: route.time,
          stations: route.stations,
          sort: route.sort,
        };
        dispatch(updateRoute({ id: route.id, route: NewRoute }));
      }

      console.log({
        id: name.id,
        name: name,
      });
      //   dispatch(
      //     putStation({
      //       id: name.id,
      //       name: name,
      //     })
      //   );
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

export default UpdateStation;
