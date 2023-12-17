import React, { useEffect, useState } from "react";
import { getMinsFromTime } from "../../../extraFunctions/ExtraFunctions";

import { TimeInput, CostInput } from "../schedule/FilterInputs";
import ObjectFilter from "../../cards/ObjectFilter";
import ObjectFilterSmall from "../../cards/ObjectFilterSmall";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "./scheduleStyles/ScheduleFilter.css";

const ScheduleFilter = ({ onFilter, isSmall, isVisible }) => {
  // хранения количества полей для выбора даты
  const [extraDateFilters, setExtraDateFilters] = useState([0]);
  // тип
  const primeTimeFrom = isSmall ? "min-time-small" : "min-time";
  const primeTimeTo = isSmall ? "max-time-small" : "max-time";
  const primeCostFrom = isSmall ? "min-cost-small" : "min-cost";
  const primeCostTo = isSmall ? "max-cost-small" : "max-cost";
  const primeDate = isSmall ? "date-small " : "date ";

  const secondaryTimeFrom = isSmall ? "min-time" : "min-time-small";
  const secondaryTimeTo = isSmall ? "max-time" : "max-time-small";
  const secondaryCostFrom = isSmall ? "min-cost" : "min-cost-small";
  const secondaryCostTo = isSmall ? "max-cost" : "max-cost-small";
  const secondaryDate = isSmall ? "date " : "date-small ";

  // ИНИЦИАЛИЗАЦИЯ
  // получение и хранение ширины окна
  const [smallVisible, setSmallVisible] = useState(window.innerWidth);

  const resizeHandler = () => {
    setSmallVisible(window.innerWidth < 1500);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // хранения значений
  const [defaulDates, setDefualtDates] = useState([]);
  // клонируем значения из другого фильтра в случае если размер экрана изменился
  useEffect(() => {
    if (smallVisible === isSmall) {
      let dates = [];
      let extraDates = [];
      let index = 0;
      let dateSelector = document.getElementById(secondaryDate + index);
      while (dateSelector) {
        extraDates.push(index);
        dates.push(dateSelector.value);

        index += 1;
        dateSelector = document.getElementById(secondaryDate + index);
      }
      setExtraDateFilters(extraDates);
      setDefualtDates(dates.length === 0 ? [""] : dates);
      document.getElementById(primeTimeFrom).value =
        document.getElementById(secondaryTimeFrom).value;
      document.getElementById(primeTimeTo).value =
        document.getElementById(secondaryTimeTo).value;
      document.getElementById(primeCostFrom).value =
        document.getElementById(secondaryCostFrom).value;
      document.getElementById(primeCostTo).value =
        document.getElementById(secondaryCostTo).value;
    }
  }, [smallVisible]);

  useEffect(() => {
    let index = 0;
    for (let date of defaulDates) {
      if (extraDateFilters.length !== 0 || index === 0) {
        document.getElementById(primeDate + index).value = date;
        index += 1;
      }
    }
  }, [defaulDates]);

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
    if (id === primeCostFrom) {
      // проверка на пустую строку
      newFilterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === primeCostTo) {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      newFilterConfig.cost = { from: filterConfig.cost.from, to: value };
    }
    if (id === primeTimeFrom) {
      if (value === "") {
        value = 0;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: value, to: filterConfig.time.to };
    }
    if (id === primeTimeTo) {
      if (value === "") {
        value = Number.MAX_SAFE_INTEGER;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: filterConfig.time.from, to: value };
    }
    if (id.indexOf("date") !== -1) {
      newFilterConfig.days = dateHandler(extraDateFilters, primeDate);
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
          document.getElementById(primeDate + f.toString()).value
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
      document.getElementById(primeDate + f.toString()).value = datesForSave[f];
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.days = dateHandler(extraDateFiltersNew);
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <>
      {isSmall ? (
        <ObjectFilterSmall clearHandler={clearHandler} isVisible={isVisible}>
          <div className="multiple-input__container">
            <div className="filter-label-input">
              <label>Стоимость:</label>
              <CostInput
                onChange={filterHandler}
                primeCostFrom={primeCostFrom}
                primeCostTo={primeCostTo}
              />
            </div>
            <div className="filter-label-input">
              <label>Время:</label>
              <TimeInput
                onChange={filterHandler}
                primeTimeFrom={primeTimeFrom}
                primeTimeTo={primeTimeTo}
              />
            </div>
          </div>

          <label>Дата:</label>
          <div className="multiple-input__container">
            {extraDateFilters.length !== 0 &&
              extraDateFilters.map((id) => (
                <DateSelect
                  id={id}
                  onChange={filterHandler}
                  deleteHandler={deleteDateHandler}
                  isOnly={extraDateFilters.length === 1}
                  key={id}
                  primeDate={primeDate}
                />
              ))}
            <button id="add-filter" onClick={addDateHandler}>
              Добавить дату
            </button>{" "}
          </div>
        </ObjectFilterSmall>
      ) : (
        <ObjectFilter clearHandler={clearHandler}>
          <CostInput
            onChange={filterHandler}
            primeCostFrom={primeCostFrom}
            primeCostTo={primeCostTo}
          />
          <TimeInput
            onChange={filterHandler}
            primeTimeFrom={primeTimeFrom}
            primeTimeTo={primeTimeTo}
          />
          {extraDateFilters.length !== 0 &&
            extraDateFilters.map((id) => (
              <DateSelect
                id={id}
                onChange={filterHandler}
                deleteHandler={deleteDateHandler}
                isOnly={extraDateFilters.length === 1}
                key={id}
                primeDate={primeDate}
              />
            ))}
          <button id="add-filter" onClick={addDateHandler}>
            Добавить дату
          </button>
        </ObjectFilter>
      )}
    </>
  );
};

export default ScheduleFilter;

// комопнент отвечающий за вывод даты
const DateSelect = ({ id, onChange, deleteHandler, isOnly, primeDate }) => {
  return (
    <div className="extra-input">
      <label>Дата:</label>
      <input type="date" id={primeDate + id} onChange={onChange} />
      {!isOnly && (
        <button id={id.toString()} onClick={deleteHandler}>
          <img src={cancelImg} id={id.toString()} />
        </button>
      )}
    </div>
  );
};

// функция, получающая значения дат и преобразующая их в удоборомый формат
const dateHandler = (extraDateFilters, primeDate) => {
  // считываем даты и сохраняем их в массив
  let dateData = [];
  for (let f of extraDateFilters) {
    dateData.push(document.getElementById(primeDate + f).value);
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
