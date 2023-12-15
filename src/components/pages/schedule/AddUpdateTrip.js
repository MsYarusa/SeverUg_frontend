import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postTrip } from "../../../store/requests/ScheduleRequests";
import { putTrip } from "../../../store/requests/ScheduleRequests";
import { getTimeFromMins } from "../../../extraFunctions/ExtraFunctions";

import { StationSelector, CostTimeInputs } from "./StationInputs";
import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./scheduleStyles/AddUpdateTrip.css";

const AddUpdateTrip = ({ cancelHandler, data }) => {
  const dispatch = useDispatch();

  // получение данных из стора
  const routes = useSelector((state) => state.routes.routes);
  const buses = useSelector((state) => state.buses.buses);
  const drivers = useSelector((state) => state.employees.drivers);

  // ХРАНЕНИЕ И ОБРАБОТКА ДАННЫХ ИНПУТОВ
  // хранение выбранных дней недели
  const [daysSelected, setDaysSelected] = useState([]);
  // хранение выбранного маршрута
  const [selectedRoute, setSelectedRoute] = useState({
    stationIndexes: [],
    route: null,
  });
  const [selectedBus, setSelectedBus] = useState({
    bus: null,
    driver: null,
  });

  // выбор маршрута
  const selectRouteHandler = (event) => {
    let route = JSON.parse(event.target.value);
    let stationIndexes = [];
    for (let i = 0; i < route.stations.length - 1; i++) {
      stationIndexes = [...stationIndexes, i + 1];
    }
    setSelectedRoute({ stationIndexes: stationIndexes, route: route });
  };

  // выбор автобуса
  const selectBusHandler = (event) => {
    let busPare = JSON.parse(event.target.value);

    setSelectedBus(busPare);
  };

  const [busPares, setBusPares] = useState([]);
  // соединение автобусов и водителей
  useEffect(() => {
    let busPares = [];
    for (let bus of buses) {
      let busPare = {
        bus: bus,
        driver: drivers.find((driver) => driver.id === bus.drive_id),
      };
      if (busPare.driver) {
        busPares.push(busPare);
      }
    }
    setBusPares(busPares);
  }, []);

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЕЙ (в случае их получения)
  // установление значений инпутов
  useEffect(() => {
    if (data) {
      document.getElementById("time").value = data.departure_time;
      document.getElementById("route-select").value = JSON.stringify(data.road);
      document.getElementById("bus-select").value = JSON.stringify({
        bus: data.bus,
        driver: data.driver,
      });
      for (let index of data.days) {
        document.getElementById("W" + index).click();
      }

      let route = data.road;
      let stationIndexes = [];
      for (let i = 0; i < route.stations.length - 1; i++) {
        stationIndexes = [...stationIndexes, i + 1];
      }
      setSelectedRoute({ stationIndexes: stationIndexes, route: route });
      setSelectedBus({ bus: data.bus, driver: data.driver });
    }
  }, [routes]);

  // ВАЛИДАЦИЯ
  // флаги успешной валидации
  const [daysOk, setDaysOk] = useState(true);
  const [timeOk, setTimeOk] = useState(true);
  const [routeOk, setRouteOk] = useState(true);
  const [busOk, setBusOk] = useState(true);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    // получение данных инпутов
    let time = document.getElementById("time").value;
    let route = JSON.parse(document.getElementById("route-select").value);
    let busPare = JSON.parse(document.getElementById("bus-select").value);
    let days = daysSelected;

    days.forEach((day, i, arr) => {
      day = day === 0 ? 7 : day;
    });

    // проверка корректности значений инпутов
    let daysOK = days.length !== 0 ? true : false;
    let timeOK = time ? true : false;
    let routeOK = route !== "Выбрать" ? true : false;
    let busOk = busPare !== "Выбрать";

    // поднятие флагов в случае корректных данных
    setDaysOk(daysOK);
    setTimeOk(timeOK);
    setRouteOk(routeOK);
    setBusOk(busOk);

    // если данные корректны, то происходит отправка запроса
    if (daysOK && timeOK && routeOK && busOk) {
      const trip = {
        road_id: route.id,
        days_id: days,
        departure_time: time,
        driver_id: busPare.driver.id,
        bus_id: busPare.bus.id,
      };
      if (data) {
        //если был указан рейс, то данные рейса обновляются
        dispatch(
          putTrip({
            id: data.id,
            trip: trip,
          })
        );
      } else {
        // если он не был указан, то создается новый рейс
        dispatch(postTrip({ trip: trip }));
      }
      // закрытие окна
      cancelHandler();
    }
  };

  // функция выводящая тип ошибки в случае некорретных входных данных
  const errorMessage = () => {
    switch (true) {
      case !timeOk:
        return "Необходимо указать время отправления";
      case !busOk:
        return "Необходимо назначить автобус";
      default:
        return "Необходимо выбрать маршрут";
    }
  };

  return (
    <AddUpdateObject
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      errorMessage={errorMessage}
      noErrors={routeOk && busOk}
    >
      <label id="main">{data ? "Изменение рейса" : "Добавление рейса"}</label>
      <label className="secondary-label">Дни работы рейса:</label>
      <Days selectHandler={setDaysSelected} />
      <p className={daysOk ? "error-disabled" : "error"}>
        {daysOk ? "" : "Необходимо указать дни работы рейса"}
      </p>
      <div className="label-input">
        <label>Время отправления:</label>
        <input
          type="time"
          id="time"
          className={timeOk ? "base-border" : "error-border"}
        />
      </div>
      <label className="secondary-label">Автобус и водитель:</label>
      <select
        id="bus-select"
        defaultValue={JSON.stringify("Выбрать")}
        onChange={selectBusHandler}
        className={busOk ? "base-border" : "error-border"}
      >
        <option disabled value={JSON.stringify("Выбрать")}>
          Выбрать
        </option>
        {busPares?.map((busPare) => (
          <option key={busPare.bus.id} value={JSON.stringify(busPare)}>
            № {busPare.bus.code} — {busPare.bus.model} —{" "}
            {busPare.bus.number_of_sits} мест.
          </option>
        ))}
      </select>
      {selectedBus.driver && (
        <select
          disabled
          id="driver-select"
          defaultValue={JSON.stringify(selectedBus.driver)}
        >
          <option disabled value={JSON.stringify(selectedBus.driver)}>
            Водитель — {selectedBus.driver.last_name}{" "}
            {selectedBus.driver.first_name.slice(0, 1)}.{" "}
            {selectedBus.driver.father_name
              ? selectedBus.driver.father_name.slice(0, 1) + "."
              : ""}
          </option>
        </select>
      )}
      <label className="secondary-label">Маршрут:</label>
      <select
        id="route-select"
        defaultValue={JSON.stringify("Выбрать")}
        onChange={selectRouteHandler}
        className={routeOk ? "base-border" : "error-border"}
      >
        <option disabled value={JSON.stringify("Выбрать")}>
          Выбрать
        </option>
        {routes?.map((route) => (
          <option key={route.id} value={JSON.stringify(route)}>
            №{route.id} "{route.stations.at(0).name} —{" "}
            {route.stations.at(-1).name}"
          </option>
        ))}
      </select>
      <div className="routes">
        {selectedRoute.route && (
          <>
            <label id="routes-label">Список станций:</label>
            <StationSelector
              index={0}
              defaultValue={selectedRoute.route.stations.at(0).name}
            />
            {selectedRoute.stationIndexes?.map((index) => (
              <div key={index} className="stations__container">
                <CostTimeInputs
                  index={index}
                  defaultTime={getTimeFromMins(
                    selectedRoute.route.time[index - 1]
                  )}
                  defaultCost={selectedRoute.route.cost[index - 1]}
                />
                <StationSelector
                  index={index}
                  defaultValue={selectedRoute.route.stations.at(index).name}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </AddUpdateObject>
  );
};

export default AddUpdateTrip;

// компоненты отображающий список дней недели
const Days = ({ selectHandler }) => {
  const [daysSelected, setDaysSelected] = useState(new Set());
  const daysDict = [
    { index: 1, label: "ПН" },
    { index: 2, label: "ВТ" },
    { index: 3, label: "СР" },
    { index: 4, label: "ЧТ" },
    { index: 5, label: "ПТ" },
    { index: 6, label: "СБ" },
    { index: 0, label: "ВС" },
  ];
  return (
    <div className="days">
      {daysDict.map((item) => (
        <DayButton
          key={item.index}
          selectHandler={selectHandler}
          dayVal={item.index}
          dayLabel={item.label}
          daysSelected={daysSelected}
          setDaysSelected={setDaysSelected}
        />
      ))}
    </div>
  );
};

// компонент отображающий кнопку выбора дня недели
const DayButton = ({
  selectHandler,
  dayVal,
  dayLabel,
  daysSelected,
  setDaysSelected,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const buttonHandler = () => {
    let newDaysSelected = daysSelected;
    if (!buttonClicked) {
      newDaysSelected.add(dayVal);
    } else {
      newDaysSelected.delete(dayVal);
    }

    setButtonClicked(!buttonClicked);
    selectHandler([...newDaysSelected]);
    setDaysSelected(newDaysSelected);
  };

  return (
    <button
      id={"W" + dayVal}
      type="button"
      className={buttonClicked ? "day-selected" : "day"}
      onClick={buttonHandler}
    >
      {dayLabel}
    </button>
  );
};
