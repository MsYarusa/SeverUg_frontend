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
import { updateRouteInTrip } from "../../../store/slicies/scheduleSlice";
import {
  getTimeFromMins,
  getMinsFromTime,
} from "../../../extraFunctions/ExtraFunctions";
import { getFromTable } from "../../../extraFunctions/ExtraFunctions";

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
      if (station1 !== defaultValue && station2 !== defaultValue) {
        time = getFromTable(timeTable, station1.id, station2.id);
        cost = getFromTable(costTable, station1.id, station2.id);
      }
      document.getElementById("time " + index).value = time
        ? getTimeFromMins(time)
        : "";
      document.getElementById("cost " + index).value = cost ? cost : "";
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
    if (prevStation !== defaultValue) {
      prevTime = getFromTable(timeTable, prevStation.id, currentStation.id);
      prevCost = getFromTable(costTable, prevStation.id, currentStation.id);
    }
    // получения значений между текущей станцией и последующей
    let nextTime = null;
    let nextCost = null;
    if (nextStation !== defaultValue) {
      nextTime = getFromTable(timeTable, currentStation.id, nextStation.id);
      nextCost = getFromTable(costTable, currentStation.id, nextStation.id);
    }
    // заполение селекторов
    if (prevID !== null) {
      document.getElementById("time " + currentID).value = prevTime
        ? getTimeFromMins(prevTime)
        : "";
      document.getElementById("cost " + currentID).value = prevCost
        ? prevCost
        : "";
    }
    if (nextID !== null) {
      document.getElementById("time " + nextID).value = nextTime
        ? getTimeFromMins(nextTime)
        : "";
      document.getElementById("cost " + nextID).value = nextCost
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

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    // массивы для хранения полученных значений
    let stationsForAdd = [];
    let indexesForAdd = [];
    let timeForAdd = [];
    let timeForUpdate = [];
    let timeForSave = [];
    let costForAdd = [];
    let costForUpdate = [];
    let costForSave = [];
    // флаги указывающие некорректность полученных значений
    let containsNullStation = false;
    let containsNullTime = false;
    let containsNullCost = false;

    // считывание значения первого селектора и проверка его на корректность
    let firstStation = JSON.parse(document.getElementById("s " + 0).value);
    if (firstStation !== defaultValue) {
      indexesForAdd.push(Number(firstStation.id));
      stationsForAdd.push(firstStation);
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
        indexesForAdd.push(currentStation.id);
        stationsForAdd.push(currentStation);
      } else {
        containsNullStation = true;
      }
      // получение значений времени
      let newTime = document.getElementById("time " + index).value;
      newTime = newTime === "" ? null : getMinsFromTime(newTime);
      // сохранение значения времени
      timeForSave.push(Number(newTime));
      // получение предыдущего значения времени на участке
      let oldTime = getFromTable(timeTable, prevStation.id, currentStation.id);

      // если значение времени не пустое и оно отличается от предыдущего значения
      if (newTime && newTime !== oldTime) {
        let timeGroup = {
          station_1_id: prevStation.id,
          station_2_id: currentStation.id,
          time: getMinsFromTime(newTime),
        };
        if (!oldTime) {
          timeForAdd.push(timeGroup);
        } else {
          timeForUpdate.push(timeGroup);
        }
      } else {
        containsNullTime = true;
      }
      // получение значений стоимости
      let newCost = document.getElementById("cost " + index).value;
      newCost = newCost === "" ? null : newCost;
      // сохранение значения стоимости
      costForSave.push(Number(newCost));
      // предыдущее значение стоимости на участке
      let oldCost = getFromTable(costTable, prevStation.id, currentStation.id);

      if (newCost && newCost !== oldCost) {
        let costGroup = {
          station_1_id: prevStation.id,
          station_2_id: currentStation.id,
          cost: newCost,
        };
        if (!oldCost) {
          costForAdd.push(costGroup);
        } else {
          costForUpdate.push(costGroup);
        }
      } else {
        containsNullCost = true;
      }
    }

    // поднятие флагов в случае некорректных входных данных
    setStationsOk(stationsForAdd.length > 1);
    setContainesNullStation(containsNullStation);
    setContainesNullTime(containsNullTime);
    setContainesNullCost(containsNullCost);

    // если данные корректны, то происходит отправка запроса
    if (
      stationsForAdd.length > 1 &&
      !containsNullStation &&
      !containsNullTime &&
      !containsNullCost
    ) {
      dispatch(postCostGroup(costForAdd));
      dispatch(postTimeGroup(timeForAdd));
      costForUpdate.forEach((costGroup, i, arr) => {
        dispatch(putCostGroup(costGroup));
      });
      timeForUpdate.forEach((timeGroup, i, arr) => {
        dispatch(putTimeGroup(timeGroup));
      });

      // console.log(
      //   " postCostGroup ",
      //   costForAdd,
      //   " putCostGroup ",
      //   costForUpdate
      // );
      // console.log(
      //   " postTimeGroup ",
      //   timeForAdd,
      //   " putTimeGroup ",
      //   timeForUpdate
      // );

      if (data) {
        //если был указан маршрут, то данные маршрута обновляются
        // отправка запроса
        dispatch(
          putRoute({
            id: data.id,
            route: { stations_id: indexesForAdd },
          })
        );

        // console.log(" putRoute ", {
        //   id: data.id,
        //   route: { stations_id: indexesForAdd },
        // });
      } else {
        // если начальные значения не были указаны, то создается новый маршрут

        dispatch(
          postRoute({
            route: { stations_id: indexesForAdd },
          })
        );

        // console.log(" postRoute ", {
        //   route: { stations_id: indexesForAdd },
        // });
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
              <CostTimeInputs index={index} defaultTime="" defaultCost="" />
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
