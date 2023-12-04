import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putRoute } from "../../../store/requests/RoutesRequests";
import { updateRouteInTrip } from "../../../store/slicies/scheduleSlice";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "../../cards/objectStyles/Window.css";
import "../schedule/scheduleStyles/AddUpdateTrip.css";

const UpdateRoute = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();
  const stations = useSelector((state) => state.stations.stations);
  const schedule = useSelector((state) => state.schedule.schedule);

  const [stationIndexes, setStationIndexes] = useState([1]);
  // восстановление данных
  const [restoreSelects, setRestoreSelects] = useState(false);

  useEffect(() => {
    if (data) {
      document.getElementById("s" + 0).value = JSON.stringify(
        data.stations.at(0)
      );
    }
    let defaultIndexes = [];
    for (let i = 0; i < data.stations.length - 1; i++) {
      defaultIndexes = [...defaultIndexes, i + 1];
    }

    setStationIndexes(defaultIndexes);
    setRestoreSelects(true);
  }, [data]);

  useEffect(() => {
    for (let index of stationIndexes) {
      document.getElementById("s" + index).value = JSON.stringify(
        data.stations.at(index)
      );
      document.getElementById("upd-time " + index).value = getTimeFromMins(
        data.time[index - 1]
      );
      document.getElementById("upd-cost " + index).value =
        data.price[index - 1];
    }
  }, [restoreSelects]);

  // валидация
  const [stationsOk, setStationsOk] = useState(true);
  const [containsNullStation, setContainesNullStation] = useState(false);
  const [containsNullTime, setContainesNullTime] = useState(false);
  const [containsNullCost, setContainesNullCost] = useState(false);

  const addStationHandler = () => {
    setStationIndexes([...stationIndexes, stationIndexes.length + 1]);
  };

  const deleteStationHandler = (event) => {
    let stationsForSave = [];
    for (let index of stationIndexes) {
      if (event.target.id !== index.toString()) {
        stationsForSave.push(
          document.getElementById("s" + index.toString()).value
        );
      }
    }
    setStationIndexes(stationIndexes.slice(0, -1));
    for (let index of stationIndexes) {
      document.getElementById("s" + index.toString()).value =
        stationsForSave[index - 1];
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let stationsForSave = [];
    let indexesForSave = [];
    let timeForSave = [];
    let costForSave = [];
    let containsNullStation = false;
    let containsNullTime = false;
    let containsNullCost = false;

    let firstStation = JSON.parse(document.getElementById("s" + 0).value);
    if (firstStation !== "Выбрать") {
      indexesForSave.push(Number(firstStation.id));
      stationsForSave.push(firstStation);
    } else {
      containsNullStation = true;
    }

    for (let index of stationIndexes) {
      // получаем станции
      let station = JSON.parse(document.getElementById("s" + index).value);
      if (station !== "Выбрать") {
        indexesForSave.push(Number(station.id));
        stationsForSave.push(station);
      } else {
        containsNullStation = true;
      }
      // получаем время
      let time = document.getElementById("upd-time " + index).value;
      if (time !== "") {
        let [hours, minutes] = time.split(":");
        time = Number(hours) * 60 + Number(minutes);
        timeForSave.push(time);
      } else {
        containsNullTime = true;
      }
      // получаем стоимость
      let cost = document.getElementById("upd-cost " + index).value;
      if (cost !== "") {
        costForSave.push(cost);
      } else {
        containsNullCost = true;
      }
    }

    setStationsOk(stationsForSave.length > 1);
    setContainesNullStation(containsNullStation);
    setContainesNullTime(containsNullTime);
    setContainesNullCost(containsNullCost);

    if (
      stationsForSave.length > 1 &&
      !containsNullStation &&
      !containsNullTime &&
      !containsNullCost
    ) {
      const newRoute = {
        id: data.id,
        price: costForSave.join(" "),
        time: timeForSave.join(" "),
        stations: stationsForSave,
        sort: indexesForSave.join(" "),
      };
      dispatch(updateRouteInTrip({ id: data.id, id: newRoute }));
      dispatch(
        putRoute({
          id: data.id,
          price: costForSave.join(" "),
          time: timeForSave.join(" "),
          sort: indexesForSave.join(" "),
          stations_id: indexesForSave,
        })
      );
      cancelHandler();
    }
  };

  const errorMessage = () => {
    switch (true) {
      case containsNullCost:
        return "Пустое поле стоимости";
      case containsNullStation:
        return "Поля со значением Выбрать (станция не указана)";
      case containsNullTime:
        return "Пустое поле времени";
      default:
        return "Необходимо указать минимум две оставновки";
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Изменение маршрута</label>
          <label id="routes-label">Список остановок:</label>
          <div className="routes">
            <Station
              key={"station" + "0"}
              stations={stations}
              index={0}
              deleteHandler={deleteStationHandler}
            />
            {stationIndexes &&
              stationIndexes?.map((index) => (
                <div key={index} className="stations__container">
                  <div className="label-input" key={"upd-time " + index}>
                    <label>Время в пути:</label>
                    <input
                      type="time"
                      id={"upd-time " + index}
                      //   className={timeOk ? "" : "error-border"}
                    />
                  </div>
                  <div className="label-input" key={"upd-cost " + index}>
                    <label>Стоимость за проезд:</label>
                    <input
                      type="number"
                      id={"upd-cost " + index}
                      //   className={costOk ? "" : "error-border"}
                    />
                    <p>руб.</p>
                  </div>
                  <Station
                    key={"station" + index}
                    stations={stations}
                    index={index}
                    deleteHandler={deleteStationHandler}
                  />
                </div>
              ))}
            <button type="button" id="add-station" onClick={addStationHandler}>
              Добавить станцию
            </button>
          </div>
        </div>
        <p
          className={
            stationsOk &&
            !containsNullStation &&
            !containsNullCost &&
            !containsNullTime
              ? "error error-disabled"
              : "error"
          }
        >
          {errorMessage()}
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

export default UpdateRoute;

const Station = ({ stations, index, deleteHandler }) => {
  return (
    <div id={"S" + index.toString()} className="station">
      <p>{(index + 1).toString() + "."}</p>
      <select
        id={"s" + index.toString()}
        defaultValue={JSON.stringify("Выбрать")}
      >
        <option disabled value={JSON.stringify("Выбрать")}>
          Выбрать
        </option>
        {stations?.map((station) => (
          <option
            key={station.name + index.toString()}
            value={JSON.stringify(station)}
          >
            {station.name}
          </option>
        ))}
      </select>
      {index !== 0 && (
        <button
          type="button"
          id={index.toString()}
          className="cancelStation"
          onClick={deleteHandler}
        >
          <img src={cancelImg} id={index.toString()} />
        </button>
      )}
    </div>
  );
};

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes;
}
