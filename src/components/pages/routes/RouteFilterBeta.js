import React, { useEffect, useState } from "react";
import { getMinsFromTime } from "../../../extraFunctions/TimeFunctions";

import { TimeInput, CostInput } from "../schedule/FilterInputs";
import ObjectFilter from "../../cards/ObjectFilter";
import ObjectFilterSmall from "../../cards/ObjectFilterSmall";

const ScheduleFilter = ({ onFilter, isSmall, isVisible }) => {
  // тип
  const primeTimeFrom = isSmall ? "min-time-small" : "min-time";
  const primeTimeTo = isSmall ? "max-time-small" : "max-time";
  const primeCostFrom = isSmall ? "min-cost-small" : "min-cost";
  const primeCostTo = isSmall ? "max-cost-small" : "max-cost";

  const secondaryTimeFrom = isSmall ? "min-time" : "min-time-small";
  const secondaryTimeTo = isSmall ? "max-time" : "max-time-small";
  const secondaryCostFrom = isSmall ? "min-cost" : "min-cost-small";
  const secondaryCostTo = isSmall ? "max-cost" : "max-cost-small";

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

  // клонируем значения из другого фильтра в случае если размер экрана изменился
  useEffect(() => {
    if (smallVisible === isSmall) {
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

  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
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
    };
    setFilterConfig(newFilterConfig);
    // отправка новых параметров родителю
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
        </ObjectFilter>
      )}
    </>
  );
};

export default ScheduleFilter;
