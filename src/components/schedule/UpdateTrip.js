import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cancelImg from "../cards/buttonImgs/close.svg";
import { putTrip } from "./ScheduleApi/PutTrip";
import "../cards/Window.css";
import "./AddUpdateTrip.css";

const UpdateTrip = ({ cancelHandler, data }) => {
  const stations = useSelector((state) => state.schedule.stations);
  const [stationIndexes, setStationIndexes] = useState([1, 2]);
  const [restoreSelects, setRestoreSelects] = useState(false);

  useEffect(() => {
    if (data) {
      document.getElementById("upd-time").value = data.time_to;
      document.getElementById("upd-cost").value = data.price;
      for (let index of data.days) {
        document.getElementById("W" + index.toString()).click();
      }
    }
    let defaultIndexes = [];
    for (let i = 0; i < data.stations.length; i++) {
      defaultIndexes = [...defaultIndexes, i + 1];
    }

    setStationIndexes(defaultIndexes);
    setRestoreSelects(true);
  }, [data]);

  useEffect(() => {
    for (let index of stationIndexes) {
      document.getElementById("s" + index.toString()).value = JSON.stringify(
        data.stations.at(index - 1)
      );
    }
  }, [restoreSelects]);

  const [daysSelected, setDaysSelected] = useState("");

  const [daysOk, setDaysOk] = useState(true);
  const [timeOk, setTimeOk] = useState(true);
  const [costOk, setCostOk] = useState(true);
  const [stationsOk, setStationsOk] = useState(true);
  const [containsNull, setContainesNull] = useState(false);

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
    let time = document.getElementById("upd-time").value;
    let cost = document.getElementById("upd-cost").value;
    let stationsForSave = [];
    let containsNull = false;

    for (let index of stationIndexes) {
      let val = JSON.parse(
        document.getElementById("s" + index.toString()).value
      );
      if (val !== "Выбрать") {
        stationsForSave.push(val);
      } else {
        containsNull = true;
      }
    }

    let daysOK = daysSelected ? true : false;
    let timeOK = time ? true : false;
    let costOK = cost ? true : false;

    setDaysOk(daysOK);
    setTimeOk(timeOK);
    setCostOk(costOK);
    setStationsOk(stationsForSave.length > 1);
    setContainesNull(containsNull);

    if (
      daysOK &&
      timeOK &&
      costOK &&
      stationsForSave.length > 1 &&
      !containsNull
    ) {
      putTrip({
        id: data.id,
        days: daysSelected,
        time: time,
        cost: Number(cost),
        stations: stationsForSave,
      });
    }
  };

  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">
          <label id="main">Измение информации о рейсе</label>
          <label>Дни работы рейса:</label>
          <Days selectHandler={setDaysSelected} />
          <p className={daysOk ? "error error-disabled" : "error"}>
            Необходимо указать дни работы рейса
          </p>
          <div className="label-input">
            <label>Время отправления:</label>
            <input
              type="time"
              id="upd-time"
              className={timeOk ? "" : "error-border"}
            />
          </div>
          <div className="label-input">
            <label>Стоимость за проезд:</label>
            <input
              type="number"
              id="upd-cost"
              className={costOk ? "" : "error-border"}
            />
            <p>руб.</p>
          </div>

          <label id="routes-label">Остановочные станции:</label>
          <div className="routes">
            {stationIndexes &&
              stationIndexes?.map((index) => (
                <Station
                  key={index}
                  stations={stations}
                  index={index}
                  deleteHandler={deleteStationHandler}
                />
              ))}
            <button type="button" id="add-station" onClick={addStationHandler}>
              Добавить станцию
            </button>
          </div>
        </div>
        <p
          className={
            stationsOk && !containsNull ? "error error-disabled" : "error"
          }
        >
          {!stationsOk
            ? "Необходимо указать минимум две оставновки"
            : "Поля со значением Выбрать (станция не указана)"}
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

const Station = ({ stations, index, deleteHandler }) => {
  return (
    <div id={"S" + index.toString()} className="station">
      <p>{index.toString() + "."}</p>
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
      <button
        type="button"
        id={index.toString()}
        className="cancelStation"
        onClick={deleteHandler}
      >
        <img src={cancelImg} id={index.toString()} />
      </button>
    </div>
  );
};

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
      id={"W" + dayVal.toString()}
      type="button"
      className={buttonClicked ? "day-selected" : "day"}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};
