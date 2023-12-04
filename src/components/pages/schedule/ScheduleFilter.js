import React, { useState, useEffect } from "react";
import { getMinsFromTime } from "../../../extraFunctions/TimeAndPriceHandlers";

import { TimeInput, CostInput } from "../schedule/FilterInputs";
import ObjectFilter from "../../cards/ObjectFilter";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "./scheduleStyles/ScheduleFilter.css";

const ScheduleFilter = ({ onFilter }) => {
  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    days: [],
  });

  // обработка инпутов фильтров
  const filterHandler = (event) => {
    // получаем id элемента в котором произошли изменения и значение
    let id = event.target.id;
    let value = event.target.value;
    // создаем переменную куда будем сохранять новые параметры
    let newFilterConfig = filterConfig;

    // в зависимости от типа инпута соохраняем значение в соответствующее поле
    if (id === "min-cost") {
      // проверка на пустую строку
      newFilterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === "max-cost") {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      newFilterConfig.cost = { from: filterConfig.cost.from, to: value };
    }
    if (id === "min-time") {
      if (value === "") {
        value = 0;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: value, to: filterConfig.time.to };
    }
    if (id === "max-time") {
      if (value === "") {
        value = Number.MAX_SAFE_INTEGER;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: filterConfig.time.from, to: value };
    }
    if (id.indexOf("date") !== -1) {
      newFilterConfig.days = dateHandler(extraDateFilters);
    }
    // изменяем старые параметры в соответствии с новыми
    setFilterConfig(newFilterConfig);
    // передаем параметры родителю
    onFilter(newFilterConfig);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newFilterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: Number.MAX_SAFE_INTEGER },
      days: [],
    };
    setFilterConfig(newFilterConfig);
    setExtraDateFilters([0]);
    // отправка новых параметров родителю
    onFilter(newFilterConfig);
  };

  // РАБОТА С ДАТАМИ
  // хранения количества полей для ввода дат
  const [extraDateFilters, setExtraDateFilters] = useState([0]);

  // добавление даты
  const addDateHandler = () => {
    setExtraDateFilters([...extraDateFilters, extraDateFilters.length]);
  };

  //удаление даты
  const deleteDateHandler = (event) => {
    //сохраняем все даты кроме удаленной
    let datesForSave = [];
    for (let f of extraDateFilters) {
      if (event.target.id !== f.toString()) {
        datesForSave.push(
          document.getElementById("date-" + f.toString()).value
        );
      }
    }
    // изменяем список описывающий количество полей
    let extraDateFiltersNew =
      extraDateFilters.slice(0, -1).length !== 0
        ? extraDateFilters.slice(0, -1)
        : [0];
    setExtraDateFilters(extraDateFiltersNew);

    // вводим значения сохраненных дат в оставшиеся поля инпутов
    for (let f of extraDateFiltersNew) {
      document.getElementById("date-" + f.toString()).value = datesForSave[f];
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.days = dateHandler(extraDateFiltersNew);
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <ObjectFilter clearHandler={clearHandler}>
      <CostInput onChange={filterHandler} />
      <TimeInput onChange={filterHandler} />
      {extraDateFilters.length !== 0 &&
        extraDateFilters.map((id) => (
          <DateSelect
            id={id}
            onChange={filterHandler}
            deleteHandler={deleteDateHandler}
            isOnly={extraDateFilters.length === 1}
            key={id}
          />
        ))}
      <button id="add-filter" onClick={addDateHandler}>
        Добавить дату
      </button>
    </ObjectFilter>
  );
};

export default ScheduleFilter;

// комопнент отвечающий за вывод даты
const DateSelect = ({ id, onChange, deleteHandler, isOnly }) => {
  return (
    <div className="date">
      <label>Дата:</label>
      <input type="date" id={"date-" + id.toString()} onChange={onChange} />
      {!isOnly && (
        <button id={id.toString()} onClick={deleteHandler}>
          <img src={cancelImg} id={id.toString()} />
        </button>
      )}
    </div>
  );
};

// функция, получающая значения дат и преобразующая их в удоборомый формат
const dateHandler = (extraDateFilters) => {
  // считываем даты и сохраняем их в массив
  let dateData = [];
  for (let f of extraDateFilters) {
    dateData.push(document.getElementById("date-" + f.toString()).value);
  }
  // создаем множество для сохраненния преобразованных дат в дни недели
  let weekDays = new Set();
  // задаем флаг указывающий на наличие пустых полей
  let dateIsNull = false;

  // преобразуем и сохраняем даты
  dateData.forEach((item, i, arr) => {
    if (item) {
      let day = new Date(item);
      weekDays.add(day.getDay());
    } else {
      dateIsNull = true;
    }
  });
  // возвращаем список дат
  return dateIsNull ? [] : [...weekDays];
};
