import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postRoute,
  postCostGroup,
  postTimeGroup,
  putRoute,
  putCostGroup,
  putTimeGroup,
} from "../../../store/requests/RoutesRequests";
import {
  getTimeFromMins,
  getMinsFromTime,
} from "../../../extraFunctions/ExtraFunctions";
import {
  getFromTable,
  addToTable,
} from "../../../extraFunctions/ExtraFunctions";

import { StationSelector, CostTimeInputs } from "../schedule/StationInputs";
import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "../schedule/scheduleStyles/AddUpdateTrip.css";

const AddUpdateRoute = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();

  // получение данных из стора
  const stations = useSelector((state) => state.stations.stations);
  const timeTable = useSelector((state) => state.routes.timeTable);
  const costTable = useSelector((state) => state.routes.costTable);

  // дефолтное значение селектора
  const defaultValue = "Выбрать";

  // ДОБАВЛЕНИЕ НОВЫХ СТАНЦИЙ
  // хранение индексов добавленных станций
  const [stationIndexes, setStationIndexes] = useState([1]);

  // добавление станции
  const addStationHandler = () => {
    setStationIndexes([...stationIndexes, stationIndexes.length + 1]);
  };

  // удаление станции
  const deleteStationHandler = (event) => {
    let stationsForAdd = [document.getElementById("s " + 0).value];
    for (let index of stationIndexes) {
      if (event.target.id !== index.toString()) {
        stationsForAdd.push(document.getElementById("s " + index).value);
      }
    }
    setStationIndexes(stationIndexes.slice(0, -1));

    document.getElementById("s " + 0).value = stationsForAdd[0];

    for (let index of stationIndexes.slice(0, -1)) {
      document.getElementById("s " + index).value = stationsForAdd[index];

      // устанавливаем занчения времени и стоимости между станциями
      let station1 = JSON.parse(stationsForAdd[index - 1]);
      let station2 = JSON.parse(stationsForAdd[index]);

      let time = null;
      let cost = null;
      let savedTime = null;
      let savedCost = null;
      if (station1 !== defaultValue && station2 !== defaultValue) {
        time = getFromTable(timeTable, station1.id, station2.id);
        savedTime = getFromTable(savedTimeTable, station1.id, station2.id);
        cost = getFromTable(costTable, station1.id, station2.id);
        savedCost = getFromTable(savedCostTable, station1.id, station2.id);
      }
      document.getElementById("time " + index).value = savedTime
        ? getTimeFromMins(savedTime)
        : time
        ? getTimeFromMins(time)
        : "";
      document.getElementById("cost " + index).value = savedCost
        ? savedCost
        : cost
        ? cost
        : "";
    }
  };

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // флаг, указывающий, что были созданны все необходимые инпуты
  const [restoreSelects, setRestoreSelects] = useState(false);

  //создание всех необходимых инпутов
  useEffect(() => {
    if (data) {
      document.getElementById("s " + 0).value = JSON.stringify(
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
        document.getElementById("s " + index).value = JSON.stringify(
          data.stations.at(index)
        );
        document.getElementById("time " + index).value = getTimeFromMins(
          data.time[index - 1]
        );
        document.getElementById("cost " + index).value = data.cost[index - 1];
      }
    }
  }, [restoreSelects]);

  // ПОДГРУЗКА ДАННЫХ ВРЕМЕНИ И СТОИМОСТИ
  // хранение данных времени и стоимости введенные пользователем но не сохраненными в сторе
  const [savedTimeTable, setSavedTimeTable] = useState([]);
  const [savedCostTable, setSavedCostTable] = useState([]);
  // обработка изменения времени
  const timeHandler = (event) => {
    let time = event.target.value;
    if (time !== "") {
      // если время введено корректно, то:
      //копируем сохранненные значения
      let timeTable = savedTimeTable;
      // преобразуем время
      time = getMinsFromTime(time);
      // получаем индексы соседних станций
      let [type, id] = event.target.id.split(" ");
      id = Number(id);
      let station1 = JSON.parse(
        document.getElementById("s " + (id - 1)).value
      ).id;
      let station2 = JSON.parse(document.getElementById("s " + id).value).id;
      // сохраняем значение в скопированной таблице и потом эту же таблицу копируем в исходный массив
      addToTable(timeTable, station1, station2, time);
      setSavedTimeTable(timeTable);
    }
  };
  // обработка изменения стоимости
  const costHandler = (event) => {
    let cost = Number(event.target.value);
    if (cost !== "") {
      // если стоимость введена корректна, то:
      //копируем сохраненные значения
      let costTable = savedCostTable;
      //получаем индексы соседних станций
      let [type, id] = event.target.id.split(" ");
      id = Number(id);
      let station1 = JSON.parse(
        document.getElementById("s " + (id - 1)).value
      ).id;
      let station2 = JSON.parse(document.getElementById("s " + id).value).id;
      // сохраняем значение в скопированной таблице и потом эту же таблицу копируем в исходный массив
      addToTable(costTable, station1, station2, cost);
      setSavedCostTable(costTable);
    }
  };
  // обработка изменения станции
  const stationOnChangeHandler = (event) => {
    // получение айдишников селекта в котором произошло изменение и айдишников соседних селектов
    let [type, currentID] = event.target.id.split(" ");
    currentID = Number(currentID);
    let prevID = currentID >= 1 ? currentID - 1 : null;
    let nextID = currentID < stationIndexes.at(-1) ? currentID + 1 : null;
    // получение значений текущего селекта
    let prevStation =
      prevID !== null
        ? JSON.parse(document.getElementById("s " + prevID).value)
        : defaultValue;
    let currentStation = JSON.parse(
      document.getElementById("s " + currentID).value
    );
    let nextStation =
      nextID !== null
        ? JSON.parse(document.getElementById("s " + nextID).value)
        : defaultValue;

    // получения значений между текущей станцией и предудыщей
    let prevTime = null;
    let prevCost = null;
    let savedPrevTime = null;
    let savedPrevCost = null;
    if (prevStation !== defaultValue) {
      prevTime = getFromTable(timeTable, prevStation.id, currentStation.id);
      savedPrevTime = getFromTable(
        savedTimeTable,
        prevStation.id,
        currentStation.id
      );
      prevCost = getFromTable(costTable, prevStation.id, currentStation.id);
      savedPrevCost = getFromTable(
        savedCostTable,
        prevStation.id,
        currentStation.id
      );
    }
    // получения значений между текущей станцией и последующей
    let nextTime = null;
    let nextCost = null;
    let savedNextTime = null;
    let savedNextCost = null;
    if (nextStation !== defaultValue) {
      nextTime = getFromTable(timeTable, currentStation.id, nextStation.id);
      savedNextTime = getFromTable(
        savedTimeTable,
        currentStation.id,
        nextStation.id
      );
      nextCost = getFromTable(costTable, currentStation.id, nextStation.id);
      savedNextCost = getFromTable(
        savedCostTable,
        currentStation.id,
        nextStation.id
      );
    }
    // заполение селекторов
    if (prevID !== null) {
      document.getElementById("time " + currentID).value = savedPrevTime
        ? getTimeFromMins(savedPrevTime)
        : prevTime
        ? getTimeFromMins(prevTime)
        : "";
      document.getElementById("cost " + currentID).value = savedPrevCost
        ? savedPrevCost
        : prevCost
        ? prevCost
        : "";
    }
    if (nextID !== null) {
      document.getElementById("time " + nextID).value = savedNextTime
        ? getTimeFromMins(savedNextTime)
        : nextTime
        ? getTimeFromMins(nextTime)
        : "";
      document.getElementById("cost " + nextID).value = savedNextCost
        ? savedNextCost
        : nextCost
        ? nextCost
        : "";
    }
  };

  // ВАЛИДАЦИЯ
  //флаги успешной валидации
  const [stationsOk, setStationsOk] = useState(true);
  const [containsNullStation, setContainesNullStation] = useState(false);
  const [containsNullTime, setContainesNullTime] = useState(false);
  const [containsNullCost, setContainesNullCost] = useState(false);
  const [noStationRepeat, setNoStationRepeat] = useState(true);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    // массивы для хранения полученных значений
    let indexesForAdd = [];
    let timeForAdd = [];
    let timeForUpdate = [];
    let costForAdd = [];
    let costForUpdate = [];
    // флаги указывающие некорректность полученных значений
    let containsNullStation = false;
    let containsNullTime = false;
    let containsNullCost = false;
    let noStationRepeat = true;

    // считывание значения первого селектора и проверка его на корректность
    let firstStation = JSON.parse(document.getElementById("s " + 0).value);
    if (firstStation !== defaultValue) {
      indexesForAdd.push(Number(firstStation.id));
    } else {
      containsNullStation = true;
    }

    // считывание всех значений всех последующих инпутов и проверка их на корректность
    for (let index of stationIndexes) {
      // получение значений станций
      let prevStation = JSON.parse(
        document.getElementById("s " + (index - 1)).value
      );
      let currentStation = JSON.parse(
        document.getElementById("s " + index).value
      );

      if (currentStation !== defaultValue) {
        if (!indexesForAdd.find((index) => index === currentStation.id)) {
          indexesForAdd.push(currentStation.id);
        } else {
          noStationRepeat = false;
          break;
        }
      } else {
        containsNullStation = true;
        break;
      }
      // получение значений времени
      let newTime = document.getElementById("time " + index).value;
      newTime = newTime === "" ? null : getMinsFromTime(newTime);
      // получение предыдущего значения времени на участке
      let oldTime = getFromTable(timeTable, prevStation.id, currentStation.id);

      // если значение времени не пустое и оно отличается от предыдущего значения
      if (newTime && newTime !== oldTime) {
        let timeGroup = {
          stations_1_id: prevStation.id,
          stations_2_id: currentStation.id,
          time: Number(newTime),
        };
        if (!oldTime) {
          timeForAdd.push(timeGroup);
        } else {
          timeForUpdate.push(timeGroup);
        }
      } else if (!newTime) {
        containsNullTime = true;
      }
      // получение значений стоимости
      let newCost = document.getElementById("cost " + index).value;
      newCost = newCost === "" ? null : Number(newCost);
      // предыдущее значение стоимости на участке
      let oldCost = getFromTable(costTable, prevStation.id, currentStation.id);

      if (newCost && newCost !== oldCost) {
        let costGroup = {
          stations_1_id: prevStation.id,
          stations_2_id: currentStation.id,
          cost: newCost,
        };
        if (!oldCost) {
          if (
            !costForAdd.find(
              (item) =>
                item.stations_1_id === costGroup.stations_1_id ||
                item.stations_2_id === costGroup.stations_2_id
            )
          ) {
            costForAdd.push(costGroup);
          }
        } else {
          if (
            !costForUpdate.find(
              (item) =>
                item.stations_1_id === costGroup.stations_1_id ||
                item.stations_2_id === costGroup.stations_2_id
            )
          ) {
            costForUpdate.push(costGroup);
          }
        }
      } else if (!newCost) {
        containsNullCost = true;
      }
    }

    // поднятие флагов в случае некорректных входных данных
    setStationsOk(indexesForAdd.length > 1);
    setContainesNullStation(containsNullStation);
    setContainesNullTime(containsNullTime);
    setContainesNullCost(containsNullCost);
    setNoStationRepeat(noStationRepeat);

    // если данные корректны, то происходит отправка запроса
    if (
      indexesForAdd.length > 1 &&
      !containsNullStation &&
      !containsNullTime &&
      !containsNullCost &&
      noStationRepeat
    ) {
      if (costForAdd.length !== 0) {
        dispatch(postCostGroup({ cost: costForAdd }));
      }
      if (timeForAdd.length !== 0) {
        dispatch(postTimeGroup({ time: timeForAdd }));
      }
      costForUpdate.forEach((costGroup, i, arr) => {
        dispatch(putCostGroup({ cost: costGroup }));
      });
      timeForUpdate.forEach((timeGroup, i, arr) => {
        dispatch(putTimeGroup({ time: timeGroup }));
      });

      if (data) {
        //если был указан маршрут, то данные маршрута обновляются
        // отправка запроса
        setTimeout(
          dispatch,
          1000,
          putRoute({
            id: data.id,
            route: { stations_id: indexesForAdd },
          })
        );
      } else {
        // если начальные значения не были указаны, то создается новый маршрут
        setTimeout(
          dispatch,
          1000,
          postRoute({
            route: { stations_id: indexesForAdd },
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
      case containsNullTime:
        return "Пустое поле времени";
      case containsNullCost:
        return "Пустое поле стоимости";
      case containsNullStation:
        return "Поля со значением Выбрать (станция не указана)";
      case !noStationRepeat:
        return "Не должно быть повторяющихся станциий";
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
      <label id="routes-label" className="secondary-label">
        Список остановок:
      </label>
      <div className="routes">
        <StationSelector
          stations={stations}
          index={0}
          deleteHandler={deleteStationHandler}
          onChange={stationOnChangeHandler}
          defaultValue={defaultValue}
        />
        {stationIndexes &&
          stationIndexes?.map((index) => (
            <div key={index} className="stations__container">
              <CostTimeInputs
                index={index}
                defaultTime=""
                defaultCost=""
                timeOnChange={timeHandler}
                costOnChange={costHandler}
              />
              <StationSelector
                stations={stations}
                index={index}
                deleteHandler={deleteStationHandler}
                onChange={stationOnChangeHandler}
                defaultValue={defaultValue}
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
