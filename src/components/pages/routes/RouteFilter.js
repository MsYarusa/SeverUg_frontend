import { useState } from "react";
import { getMinsFromTime } from "../../../extraFunctions/ExtraFunctions";

import { TimeInput, CostInput } from "../schedule/FilterInputs";
import ObjectFilter from "../../cards/ObjectFilter";

import "../schedule/scheduleStyles/ScheduleFilter.css";

const ScheduleFilter = ({ onFilter }) => {
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
  });

  // отправка параметров фильтра родителю
  const filterHandler = (event) => {
    // получаем id элемента в котором произошли изменения и значение
    let id = event.target.id;
    let value = event.target.value;
    // создаем переменную куда будем сохранять новые параметры
    let newFilterConfig = filterConfig;

    // в зависимости от типа инпута соохраняем значение в соответствующее поле
    if (id === "min-cost") {
      // проверка на пустую строку
      value = value === "" ? 0 : value;
      newFilterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === "max-cost") {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      newFilterConfig.cost = {
        from: filterConfig.cost.from,
        to: Number(value),
      };
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
    // изменяем старые
    setFilterConfig(newFilterConfig);
    // передача параметров родителю
    onFilter(newFilterConfig);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newFilterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    };
    setFilterConfig(newFilterConfig);
    // отправка новых параметров родителю
    onFilter(newFilterConfig);
  };

  return (
    <ObjectFilter clearHandler={clearHandler}>
      <CostInput onChange={filterHandler} />
      <TimeInput onChange={filterHandler} />
    </ObjectFilter>
  );
};

export default ScheduleFilter;
