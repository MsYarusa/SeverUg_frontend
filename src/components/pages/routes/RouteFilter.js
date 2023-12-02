import ObjectFilter from "../../cards/ObjectFilter";

import "../schedule/scheduleStyles/ScheduleFilter.css";

let filterConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: Number.MAX_SAFE_INTEGER },
};

const ScheduleFilter = ({ onFilter }) => {
  const filterHandler = (event) => {
    let id = event.target.id;
    let value = event.target.value;

    if (id === "min-cost") {
      value = value === "" ? 0 : value;
      filterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === "max-cost") {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      filterConfig.cost = { from: filterConfig.cost.from, to: Number(value) };
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

    onFilter(filterConfig);
  };

  const clearHandler = () => {
    filterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    };
    onFilter(filterConfig);
  };

  return (
    <ObjectFilter>
      <div className="cost">
        <label>Общая стоимость:</label>
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
        <label>Время в пути:</label>
        <div>
          <label>От</label>
          <input id="min-time" type="time" onChange={filterHandler} />
          <label>До</label>
          <input id="max-time" type="time" onChange={filterHandler} />
        </div>
      </div>
      <button id="clear" type="reset" onClick={clearHandler}>
        Сбросить
      </button>
    </ObjectFilter>
  );
};

export default ScheduleFilter;
