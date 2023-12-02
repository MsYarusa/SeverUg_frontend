import React, { useState } from "react";
import ObjectFilter from "../../cards/ObjectFilter";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "./scheduleStyles/ScheduleFilter.css";

let filterConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: Number.MAX_SAFE_INTEGER },
  days: [],
};

const ScheduleFilter = ({ onFilter }) => {
  const [extraDateFilters, setExtraDateFilters] = useState([0]);

  const filterHandler = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "min-cost") {
      filterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === "max-cost") {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      filterConfig.cost = { from: filterConfig.cost.from, to: value };
    }
    if (id === "min-time") {
      if (value === "") {
        value = 0;
      } else {
        let [hours, mins] = value.split(":");
        value = Number(hours) * 60 + Number(mins);
      }
      filterConfig.time = { from: value, to: filterConfig.time.to };
    }
    if (id === "max-time") {
      if (value === "") {
        value = Number.MAX_SAFE_INTEGER;
      } else {
        let [hours, mins] = value.split(":");
        value = Number(hours) * 60 + Number(mins);
      }
      filterConfig.time = { from: filterConfig.time.from, to: value };
    }
    if (id.indexOf("date") !== -1) {
      dateHandler(extraDateFilters);
    }

    onFilter(filterConfig);
  };

  const clearHandler = () => {
    console.log(extraDateFilters);
    filterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: Number.MAX_SAFE_INTEGER },
      days: [],
    };
    setExtraDateFilters([0]);
    onFilter(filterConfig);
  };

  const addDateHandler = () => {
    let update = [...extraDateFilters, extraDateFilters.length];
    setExtraDateFilters(update);
  };

  const deleteDateHandler = (event) => {
    let datesForSave = [];
    console.log(extraDateFilters);
    for (let f of extraDateFilters) {
      if (event.target.id !== f.toString()) {
        datesForSave.push(
          document.getElementById("date-" + f.toString()).value
        );
      }
    }
    let extraDateFiltersNew =
      extraDateFilters.slice(0, -1).length !== 0
        ? extraDateFilters.slice(0, -1)
        : [0];
    setExtraDateFilters(extraDateFiltersNew);
    console.log(datesForSave);
    console.log(extraDateFiltersNew);
    for (let f of extraDateFiltersNew) {
      document.getElementById("date-" + f.toString()).value = datesForSave[f];
    }

    dateHandler(extraDateFiltersNew);
    onFilter(filterConfig);
  };

  return (
    <ObjectFilter>
      <div className="cost">
        <label>Стоимость:</label>
        <div>
          <label>От</label>
          <input id="min-cost" type="number" onChange={filterHandler} />
          <p>руб.</p>
        </div>
        <div>
          <label>До</label>
          <input id="max-cost" type="number" onChange={filterHandler} />
          <p>руб.</p>
        </div>
      </div>
      <div className="time">
        <label>Время:</label>
        <div>
          <label>От</label>
          <input id="min-time" type="time" onChange={filterHandler} />
          <label>До</label>
          <input id="max-time" type="time" onChange={filterHandler} />
        </div>
      </div>
      {extraDateFilters.length !== 0 &&
        extraDateFilters.map((id) => (
          <DateSelect
            id={id}
            func={filterHandler}
            deleteHandler={deleteDateHandler}
            isOnly={extraDateFilters.length === 1}
            key={id}
          />
        ))}
      <button id="add-filter" onClick={addDateHandler}>
        Добавить дату
      </button>

      <button id="clear" type="reset" onClick={clearHandler}>
        Сбросить
      </button>
    </ObjectFilter>
  );
};

export default ScheduleFilter;

const DateSelect = ({ id, func, deleteHandler, isOnly }) => {
  return (
    <div className="date">
      <label>Дата:</label>
      <input type="date" id={"date-" + id.toString()} onChange={func} />
      {!isOnly && (
        <button id={id.toString()} onClick={deleteHandler}>
          <img src={cancelImg} id={id.toString()} />
        </button>
      )}
    </div>
  );
};

const dateHandler = (extraDateFilters) => {
  let dateData = [];
  for (let f of extraDateFilters) {
    dateData.push(document.getElementById("date-" + f.toString()).value);
  }
  let weekDays = new Set();
  let dateIsNull = false;

  dateData.forEach((item, i, arr) => {
    if (item) {
      let day = new Date(item);
      weekDays.add(day.getDay());
    } else {
      dateIsNull = true;
    }
  });

  filterConfig.days = dateIsNull ? [] : [...weekDays];
};
