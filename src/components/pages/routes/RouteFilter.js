import ObjectFilter from "../../cards/ObjectFilter";
import "../../pages/schedule/ScheduleFilter.css";

let filterConfig = {
  cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
  time: { from: 0, to: 23.59 },
};

const ScheduleFilter = ({ onFilter }) => {
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

    onFilter(filterConfig);
  };

  const clearHandler = () => {
    filterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: 23.59 },
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
