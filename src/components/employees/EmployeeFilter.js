import React from "react";
import ObjectFilter from "../cards/ObjectFilter";
import { useSelector } from "react-redux";

const EmployeeFilter = () => {
  const roles = useSelector((state) => state.employees.roles);
  console.log(roles);
  return (
    <ObjectFilter>
      <div>
        <label>Должность:</label>
        <select defaultValue={"Выбрать"}>
          <option disabled>Выбрать</option>
          <option value={null}>Все</option>
          {roles?.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <button>Сбросить</button>
    </ObjectFilter>
  );
};

export default EmployeeFilter;
