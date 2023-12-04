import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRoute } from "../../../store/requests/RoutesRequests";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "../../cards/objectStyles/Window.css";
import "../schedule/scheduleStyles/AddUpdateTrip.css";

const AddRoute = ({ cancelHandler }) => {
  const dispatch = useDispatch();
  const stations = useSelector((state) => state.stations.stations);

  const [stationIndexes, setStationIndexes] = useState([1]);

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
        stationsForSave.push(document.getElementById("s" + index).value);
      }
    }
    setStationIndexes(stationIndexes.slice(0, -1));
    for (let index of stationIndexes) {
      document.getElementById("s" + index).value = stationsForSave[index - 1];
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let stationsForSave = [];
    let timeForSave = [];
    let costForSave = [];
    let containsNullStation = false;
    let containsNullTime = false;
    let containsNullCost = false;

    let firstStation = JSON.parse(document.getElementById("s" + 0).value);
    if (firstStation !== "Выбрать") {
      stationsForSave.push(Number(firstStation.id));
    } else {
      containsNullStation = true;
    }

    for (let index of stationIndexes) {
      // получаем станции
      let station = JSON.parse(document.getElementById("s" + index).value);
      if (station !== "Выбрать") {
        stationsForSave.push(Number(station.id));
      } else {
        containsNullStation = true;
      }
      // получаем время
      let time = document.getElementById("add-time " + index).value;
      if (time !== "") {
        let [hours, minutes] = time.split(":");
        time = Number(hours) * 60 + Number(minutes);
        timeForSave.push(time);
      } else {
        containsNullTime = true;
      }
      // получаем стоимость
      let cost = document.getElementById("add-cost " + index).value;
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
      console.log({
        price: costForSave.join(" "),
        time: timeForSave.join(" "),
        sort: stationsForSave.join(" "),
        stations_id: stationsForSave,
      });
      dispatch(
        postRoute({
          price: costForSave.join(" "),
          time: timeForSave.join(" "),
          sort: stationsForSave.join(" "),
          stations_id: stationsForSave,
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
          <label id="main">Добавление маршрута</label>
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
                  <div className="label-input" key={"add-time " + index}>
                    <label>Время в пути:</label>
                    <input type="time" id={"add-time " + index} />
                  </div>
                  <div className="label-input" key={"add-cost " + index}>
                    <label>Стоимость за проезд:</label>
                    <input type="number" id={"add-cost " + index} />
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

export default AddRoute;

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
