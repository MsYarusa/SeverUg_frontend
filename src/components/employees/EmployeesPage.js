import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ObjectsList from "../cards/ObjectsList";
import { getEmployees } from "./GetEmployees";
import Employee from "./Employee";
import ObjectSearch from "../cards/ObjectSearch";
import "./EmployeesPage.css";
import "../cards/ObjectSearch.css";
import EmployeeFilter from "./EmployeeFilter";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [empList, setEmpList] = useState(employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setEmpList(employees);
  }, [employees]);

  const searchHandler = (searchData) => {
    let search_results = [];

    for (let emp of employees) {
      let lastName = emp.last_name.toLowerCase();
      let firstName = emp.first_name.toLowerCase();

      let lastFirst = [lastName, firstName].join(" ").indexOf(searchData);
      let firstLast = [firstName, lastName].join(" ").indexOf(searchData);

      if (lastFirst === 0 || firstLast === 0) {
        search_results.push(emp);
      }
    }

    setEmpList(search_results);
  };

  return (
    <div className="employees-page">
      <EmployeeFilter />
      <ObjectsList>
        <ul>
          <div className="object-search">
            <ObjectSearch
              search={searchHandler}
              searchMessage={"Найти сотрудника"}
            />
            <button>Зарегистрировать сотрудника</button>
          </div>
          {empList?.map((item) => (
            <Employee key={item.id} data={item} />
          ))}
        </ul>
        {empList.length === 0 && <p id="message">Нет совпадений</p>}
      </ObjectsList>
    </div>
  );
};

export default EmployeesPage;
