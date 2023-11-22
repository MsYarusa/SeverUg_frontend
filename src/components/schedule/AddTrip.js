import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStations } from "./ScheduleApi/GetStations";
import cancelImg from "../cards/buttonImgs/close.svg";
import "../cards/Window.css";
import "./AddUpdateTrip.css";

const AddTrip = ({ cancelHandler }) => {
  const dispatch = useDispatch();
  const stations = useSelector((state) => state.schedule.stations);

  const [stationIndexes, setStationIndexes] = useState([]);
  const [daysSelected, setDaysSelected] = useState([]);
  const [stationsSelected, setStationsSelected] = useState([]);
  const [cost, setCost] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    dispatch(getStations());
  }, []);

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

  const stationsHandler = () => {
    let stationsForSave = [];

    for (let index of stationIndexes) {
      stationsForSave.push(
        document.getElementById("s" + index.toString()).value
      );
    }

    setStationsSelected(stationsForSave);
  };

  const timeHandler = (event) => {
    setTime(event.target.value);
  };

  const costHandler = (event) => {
    setCost(event.target.value);
  };

  return (
    <div className="window__container">
      <form className="window">
        <div className="window__inner">
          <label id="main">Добавление рейса</label>
          <label>Дни недели:</label>
          <Days selectHandler={setDaysSelected} />
          <div className="label-input">
            <label>Время отправления:</label>
            <input required type="time" onSubmit={timeHandler} />
          </div>
          <div className="label-input">
            <label>Стоимость:</label>
            <input required type="number" onSubmit={costHandler} />
            <p>руб.</p>
          </div>

          <label>Маршрут:</label>
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
            <button type="button" id="addStation" onClick={addStationHandler}>
              Добавить станцию
            </button>
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

export default AddTrip;

const Station = ({ stations, index, deleteHandler }) => {
  return (
    <div id={"S" + index.toString()} className="station">
      <p>{index.toString() + "."}</p>
      <select id={"s" + index.toString()} defaultValue={"Выбрать"}>
        <option disabled>Выбрать</option>
        {stations?.map((station) => (
          <option key={station.name + index.toString()} value={station.name}>
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

const Days = ({ selectHandler }) => {
  let daysSelected = new Set();
  return (
    <div className="days">
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={1}
      >
        ПН
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={2}
      >
        ВТ
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={3}
      >
        СР
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={4}
      >
        ЧТ
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={5}
      >
        ПТ
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={6}
      >
        СБ
      </DayButton>
      <DayButton
        daysSelected={daysSelected}
        selectHandler={selectHandler}
        dayVal={0}
      >
        ВС
      </DayButton>
    </div>
  );
};

const DayButton = ({ children, daysSelected, selectHandler, dayVal }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const buttonHandler = () => {
    if (!buttonClicked) {
      daysSelected.add(dayVal);
    } else {
      daysSelected.delete(dayVal);
    }

    setButtonClicked(!buttonClicked);
    selectHandler([...daysSelected].sort().join(""));
  };

  return (
    <button
      type="button"
      className={buttonClicked ? "day-selected" : "day"}
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};
