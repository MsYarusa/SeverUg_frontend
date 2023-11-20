import React, { useState } from "react";
import ObjectFilter from "../cards/ObjectFilter";
import { useSelector } from "react-redux";

const ScheduleFilter = ({ onFilter }) => {
  const roles = useSelector((state) => state.employees.roles);
  const [extraDateFilters, setExtraDateFilters] = useState([]);

  const all = "Все";

  const selectHandler = (event) => {
    let filterConfig = [];
    let includeAll = document.getElementById("role-main").value === all;
    let filterData = [document.getElementById("role-main").value];

    for (let f of extraDateFilters) {
      filterData.push(document.getElementById(f).value);
      includeAll = document.getElementById(f).value === all || includeAll;
    }

    console.log("new", filterData);

    if (includeAll) {
      filterConfig = [...roles];
    } else {
      filterConfig = [...filterData];
    }
    onFilter(filterConfig);
  };

  const clearHandler = () => {
    document.getElementById("role-main").value = "Выбрать";
    setExtraDateFilters([]);
    onFilter([]);
  };

  const addDateHandler = () => {
    let update = [...extraDateFilters, extraDateFilters.length + 1];
    setExtraDateFilters(update);
  };

  return (
    <ObjectFilter>
      <div>
        <label>Стоимость:</label>
        <div>
          <input id="min-cost" type="number" placeholder="От, руб." />
          <input id="max-cost" type="number" placeholder="До, руб." />
        </div>
      </div>
      <div>
        <label>Время:</label>
        <div>
          <input id="min-time" type="time" />
          <input id="max-time" type="time" />
        </div>
      </div>
      <DateSelect
        params={{
          id: "date-main",
          roles: roles,
          func: selectHandler,
        }}
        key={0}
      />
      {extraDateFilters.length !== 0 &&
        extraDateFilters.map((id) => (
          <DateSelect
            params={{
              id: id,
              roles: roles,
              func: selectHandler,
            }}
            key={id}
          />
        ))}
      <button id="add-filter" onClick={addDateHandler}>
        Добавить фильтр
      </button>

      <button id="clear" onClick={clearHandler}>
        Сбросить
      </button>
    </ObjectFilter>
  );
};

export default ScheduleFilter;

const DateSelect = ({ params }) => {
  return (
    <div>
      <label>Дата:</label>
      <input type="date" id={params.id} onChange={params.func} />
    </div>
  );
};
