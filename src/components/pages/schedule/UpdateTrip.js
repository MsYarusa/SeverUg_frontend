import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putTrip } from "../../../requests/SheduleRequests";
import "../../cards/Window.css";
import "./AddUpdateTrip.css";

const UpdateTrip = ({ cancelHandler, data }) => {
  const dispatch = useDispatch;
  const routes = useSelector((state) => state.routes.routes);

  const [selectedRoute, setSelectedRoute] = useState({
    indexes: [],
    route: null,
  });
  const [daysSelected, setDaysSelected] = useState("");

  useEffect(() => {
    if (data) {
      document.getElementById("upd-time").value = data.departure_time;
      document.getElementById("route-select").value = JSON.stringify(data.road);
      for (let index of data.days) {
        document.getElementById("W" + index).click();
      }

      let route = data.road;
      let indexes = [];
      for (let i = 0; i < route.stations.length - 1; i++) {
        indexes = [...indexes, i + 1];
      }
      setSelectedRoute({ indexes: indexes, route: route });
    }
  }, [routes]);

  const [daysOk, setDaysOk] = useState(true);
  const [timeOk, setTimeOk] = useState(true);
  const [routeOk, setRouteOk] = useState(true);

  const selectRouteHandler = (event) => {
    let route = JSON.parse(event.target.value);
    let indexes = [];
    for (let i = 0; i < route.stations.length - 1; i++) {
      indexes = [...indexes, i + 1];
    }
    setSelectedRoute({ indexes: indexes, route: route });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let time = document.getElementById("upd-time").value;
    let route = JSON.parse(document.getElementById("route-select").value);

    let daysOK = daysSelected ? true : false;
    let timeOK = time ? true : false;
    let routeOK = route !== "Выбрать" ? true : false;

    setDaysOk(daysOK);
    setTimeOk(timeOK);
    setRouteOk(routeOK);

    if (daysOK && timeOK && routeOK) {
      console.log({
        id: data.id,
        days: daysSelected,
        time: time,
        road_id: route.id,
      });
      // dispatch(
      //   putTrip({
      //     id: data.id,
      //     days: daysSelected,
      //     time: time,
      //     road_id: route.id,
      //   })
      // );
      cancelHandler();
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Добавление рейса</label>
          <label>Дни работы рейса:</label>
          <Days selectHandler={setDaysSelected} />
          <p className={daysOk ? "error-disabled" : "error"}>
            Необходимо указать дни работы рейса
          </p>
          <div className="label-input">
            <label>Время отправления:</label>
            <input
              type="time"
              id="upd-time"
              className={timeOk ? "base-border" : "error-border"}
            />
          </div>
          <label>Маршрут:</label>
          <select
            id="route-select"
            defaultValue={JSON.stringify("Выбрать")}
            onChange={selectRouteHandler}
          >
            <option disabled value={JSON.stringify("Выбрать")}>
              Выбрать
            </option>
            {routes?.map((route) => (
              <option key={route.id} value={JSON.stringify(route)}>
                {console.log(route)}№{route.id} "{route.stations.at(0).name} —{" "}
                {route.stations.at(-1).name}"
              </option>
            ))}
          </select>
          <div className="routes">
            {selectedRoute.route && (
              <>
                <label id="routes-label">Список станций:</label>
                <div className="station">
                  <p>1.</p>
                  <select
                    disabled
                    defaultValue={JSON.stringify(
                      selectedRoute.route.stations.at(0)
                    )}
                  >
                    <option
                      disabled
                      value={JSON.stringify(selectedRoute.route.stations.at(0))}
                    >
                      {selectedRoute.route.stations.at(0).name}
                    </option>
                  </select>
                </div>
                {selectedRoute.indexes?.map((index) => (
                  <div key={index} className="stations__container">
                    <div className="label-input" key={"upd-time " + index}>
                      <label>Время в пути:</label>
                      <input
                        disabled
                        type="text"
                        value={getTimeFromMins(
                          selectedRoute.route.time[index - 1]
                        )}
                      />
                    </div>
                    <div className="label-input" key={"upd-cost " + index}>
                      <label>Стоимость за проезд:</label>
                      <input
                        disabled
                        type="number"
                        value={selectedRoute.route.price[index - 1]}
                      />
                      <p>руб.</p>
                    </div>
                    <div id={"S" + index} className="station">
                      <p>{index + 1 + "."}</p>
                      <select
                        disabled
                        defaultValue={JSON.stringify(
                          selectedRoute.route.stations.at(index)
                        )}
                      >
                        <option
                          disabled
                          value={JSON.stringify(
                            selectedRoute.route.stations.at(index)
                          )}
                        >
                          {selectedRoute.route.stations.at(index).name}
                        </option>
                      </select>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <p className={routeOk ? "error-disabled" : "error"}>
          Необходимо выбрать маршрут
        </p>
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

export default UpdateTrip;

let daysSelected = new Set();

const Days = ({ selectHandler }) => {
  return (
    <div className="days">
      <DayButton selectHandler={selectHandler} dayVal={1}>
        ПН
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={2}>
        ВТ
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={3}>
        СР
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={4}>
        ЧТ
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={5}>
        ПТ
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={6}>
        СБ
      </DayButton>
      <DayButton selectHandler={selectHandler} dayVal={0}>
        ВС
      </DayButton>
    </div>
  );
};

const DayButton = ({ children, selectHandler, dayVal }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const buttonHandler = () => {
    if (!buttonClicked) {
      daysSelected.add(dayVal);
    } else {
      daysSelected.delete(dayVal);
    }

    setButtonClicked(!buttonClicked);
    selectHandler([...daysSelected].sort().join(" "));
  };

  return (
    <button
      id={"W" + dayVal}
      type="button"
      className={buttonClicked ? "day-selected" : "day"}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}
