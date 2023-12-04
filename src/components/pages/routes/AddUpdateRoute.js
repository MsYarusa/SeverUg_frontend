import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putRoute } from "../../../store/requests/RoutesRequests";
import { postRoute } from "../../../store/requests/RoutesRequests";
import { updateRouteInTrip } from "../../../store/slicies/scheduleSlice";
import { getTimeFromMins } from "../../../extraFunctions/TimeAndPriceHandlers";

import { StationSelector, CostTimeInputs } from "../schedule/StationInputs";
import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "../schedule/scheduleStyles/AddUpdateTrip.css";

const AddUpdateRoute = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();

  // получение данных из стора
  const stations = useSelector((state) => state.stations.stations);

  // ДОБАВЛЕНИЕ НОВЫХ СТАНЦИЙ
  // хранение индексов добавленных станций
  const [stationIndexes, setStationIndexes] = useState([1]);

  // добавление станции
  const addStationHandler = () => {
    setStationIndexes([...stationIndexes, stationIndexes.length + 1]);
  };

  // удаление станции
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

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // флаг, указывающий, что были созданны все необходимые инпуты
  const [restoreSelects, setRestoreSelects] = useState(false);

  //создание всех необходимых инпутов
  useEffect(() => {
    if (data) {
      document.getElementById("s" + 0).value = JSON.stringify(
        data.stations.at(0)
      );
      let defaultIndexes = [];
      for (let i = 0; i < data.stations.length - 1; i++) {
        defaultIndexes = [...defaultIndexes, i + 1];
      }

      setStationIndexes(defaultIndexes);
      setRestoreSelects(true);
    }
  }, [data]);

  // наполнение инпутов данными
  useEffect(() => {
    if (restoreSelects) {
      for (let index of stationIndexes) {
        document.getElementById("s" + index).value = JSON.stringify(
          data.stations.at(index)
        );
        document.getElementById("time " + index).value = getTimeFromMins(
          data.time[index - 1]
        );
        document.getElementById("cost " + index).value = data.price[index - 1];
      }
    }
  }, [restoreSelects]);

  // ВАЛИДАЦИЯ
  //флаги успешной валидации
  const [stationsOk, setStationsOk] = useState(true);
  const [containsNullStation, setContainesNullStation] = useState(false);
  const [containsNullTime, setContainesNullTime] = useState(false);
  const [containsNullCost, setContainesNullCost] = useState(false);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    // массивы для хранения полученных значений
    let stationsForSave = [];
    let indexesForSave = [];
    let timeForSave = [];
    let costForSave = [];
    //флаги указывающие некорректность полученных значений
    let containsNullStation = false;
    let containsNullTime = false;
    let containsNullCost = false;

    // считывание значения первого селектора и проверка его на корректность
    let firstStation = JSON.parse(document.getElementById("s" + 0).value);
    if (firstStation !== "Выбрать") {
      indexesForSave.push(Number(firstStation.id));
      stationsForSave.push(firstStation);
    } else {
      containsNullStation = true;
    }

    // считывание всех значений всех последующих инпутов и проверка их на корректность
    for (let index of stationIndexes) {
      // получение значений станций
      let station = JSON.parse(document.getElementById("s" + index).value);
      if (station !== "Выбрать") {
        indexesForSave.push(Number(station.id));
        stationsForSave.push(station);
      } else {
        containsNullStation = true;
      }
      // получение значений времени
      let time = document.getElementById("time " + index).value;
      if (time !== "") {
        let [hours, minutes] = time.split(":");
        time = Number(hours) * 60 + Number(minutes);
        timeForSave.push(time);
      } else {
        containsNullTime = true;
      }
      // получение значений стоимости
      let cost = document.getElementById("cost " + index).value;
      if (cost !== "") {
        costForSave.push(cost);
      } else {
        containsNullCost = true;
      }
    }

    // поднятие флагов в случае некорректных входных данных
    setStationsOk(stationsForSave.length > 1);
    setContainesNullStation(containsNullStation);
    setContainesNullTime(containsNullTime);
    setContainesNullCost(containsNullCost);

    // если данные корректны, то происходит отправка запроса
    if (
      stationsForSave.length > 1 &&
      !containsNullStation &&
      !containsNullTime &&
      !containsNullCost
    ) {
      if (data) {
        //если был указан маршрут, то данные маршрута обновляются
        const newRoute = {
          id: data.id,
          price: costForSave.join(" "),
          time: timeForSave.join(" "),
          stations: stationsForSave,
          sort: indexesForSave.join(" "),
        };
        // локальное изменение связанных с маршрутом рейсов
        dispatch(updateRouteInTrip({ id: data.id, id: newRoute }));
        // отправка запроса
        dispatch(
          putRoute({
            id: data.id,
            price: costForSave.join(" "),
            time: timeForSave.join(" "),
            sort: indexesForSave.join(" "),
            stations_id: indexesForSave,
          })
        );
      } else {
        // если начальные значения не были указаны, то создается новый маршрут
        dispatch(
          postRoute({
            price: costForSave.join(" "),
            time: timeForSave.join(" "),
            sort: stationsForSave.join(" "),
            stations_id: stationsForSave,
          })
        );
      }
      //закрытие окна
      cancelHandler();
    }
  };

  // функция выводящая тип ошибки в случае некорретных входных данных
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
    <AddUpdateObject
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      errorMessage={errorMessage}
      noErrors={
        stationsOk &&
        !containsNullStation &&
        !containsNullCost &&
        !containsNullTime
      }
    >
      <label id="main">
        {data ? "Изменение маршрута" : "Добавление маршрута"}
      </label>
      <label id="routes-label">Список остановок:</label>
      <div className="routes">
        <StationSelector
          stations={stations}
          index={0}
          deleteHandler={deleteStationHandler}
          defaultValue="Выбрать"
        />
        {stationIndexes &&
          stationIndexes?.map((index) => (
            <div key={index} className="stations__container">
              <CostTimeInputs index={index} defaultTime="" defaultCost="" />
              <StationSelector
                stations={stations}
                index={index}
                deleteHandler={deleteStationHandler}
                defaultValue="Выбрать"
              />
            </div>
          ))}
        <button type="button" id="add-station" onClick={addStationHandler}>
          Добавить станцию
        </button>
      </div>
    </AddUpdateObject>
  );
};

export default AddUpdateRoute;
