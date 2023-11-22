import React, { useState } from "react";
import ObjectFilter from "../cards/ObjectFilter";
import "./ScheduleFilter.css";
import cancelImg from "../cards/buttonImgs/close.svg";

let filterConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: 23.59 },
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
      let [hours, mins] = value.split(":");
      value = Number(hours) + Number(mins) / 100;
      filterConfig.time = { from: value, to: filterConfig.time.to };
    }
    if (id === "max-time") {
      let [hours, mins] = value.split(":");
      value = Number(hours) + Number(mins) / 100;
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
      time: { from: 0, to: 23.59 },
      days: [],
    };
    setExtraDateFilters([]);
    onFilter(filterConfig);
  };

  const addDateHandler = () => {
    let update = [...extraDateFilters, extraDateFilters.length + 1];
    setExtraDateFilters(update);
  };

  const deleteDateHandler = (event) => {
    let datesForSave = [];
    for (let f of extraDateFilters) {
      if (event.target.id !== f.toString()) {
        datesForSave.push(
          document.getElementById("date-" + f.toString()).value
        );
      }
    }
    let extraDateFiltersNew = extraDateFilters.slice(0, -1);
    setExtraDateFilters(extraDateFiltersNew);
    for (let f of extraDateFilters) {
      document.getElementById("date-" + f.toString()).value =
        datesForSave[f - 1];
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

const DateSelect = ({ id, func, deleteHandler }) => {
  return (
    <div className="date">
      <label>Дата:</label>
      <input type="date" id={"date-" + id.toString()} onChange={func} />
      {deleteHandler && (
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
