import React, { useState } from "react";
import ObjectFilter from "../cards/ObjectFilter";
import { useSelector } from "react-redux";

const EmployeeFilter = ({ onFilter }) => {
  const roles = useSelector((state) => state.employees.roles);
  const [extraFilters, setExtraFilters] = useState([]);

  const all = "Все";

  const selectHandler = () => {
    let filterConfig = [];
    let includeAll = document.getElementById("role-main").value === all;
    let filterData = [document.getElementById("role-main").value];

    for (let f of extraFilters) {
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
    setExtraFilters([]);
    onFilter([]);
  };

  const addHandler = () => {
    let update = [...extraFilters, extraFilters.length + 1];
    setExtraFilters(update);
  };

  return (
    <ObjectFilter>
      <RoleSelect
        params={{
          key: 0,
          id: "role-main",
          all: all,
          roles: roles,
          func: selectHandler,
        }}
      />
      {extraFilters.length !== 0 &&
        extraFilters.map((id) => (
          <RoleSelect
            params={{
              id: id,
              all: all,
              roles: roles,
              func: selectHandler,
            }}
            key={id}
          />
        ))}
      <button id="add-filter" onClick={addHandler}>
        Добавить фильтр
      </button>
      <button id="clear" type="reset" onClick={clearHandler}>
        Сбросить
      </button>
    </ObjectFilter>
  );
};

export default EmployeeFilter;

const RoleSelect = ({ params }) => {
  return (
    <div>
      <label>Должность:</label>
      <select defaultValue={"Выбрать"} onChange={params.func} id={params.id}>
        <option disabled>Выбрать</option>
        <option value={null}>{params.all}</option>
        {params.roles?.map((role) => (
          <option key={role + params.id.toString()} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};
