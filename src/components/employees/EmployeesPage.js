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
  const [filteredList, setFilteredList] = useState(employees);
  const [searchedList, setSearchedList] = useState(employees);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  useEffect(() => {
    setFilteredList(employees);
    setSearchedList(employees);
  }, [employees]);

  useEffect(() => {
    setSearchedList(filteredList);
  }, [filteredList]);

  const searchHandler = (searchConfig) => {
    let search_results = [];

    for (let emp of filteredList) {
      let lastName = emp.last_name.toLowerCase();
      let firstName = emp.first_name.toLowerCase();

      let lastFirst = [lastName, firstName].join(" ").indexOf(searchConfig);
      let firstLast = [firstName, lastName].join(" ").indexOf(searchConfig);

      if (lastFirst === 0 || firstLast === 0) {
        search_results.push(emp);
      }
    }

    setSearchedList(search_results);
  };

  const filterHandler = (filterConfig) => {
    let search_results = [];
    if (filterConfig.length === 0) {
      setFilteredList(employees);
    } else {
      for (let emp of employees) {
        for (let role of filterConfig) {
          if (emp.role === role) {
            search_results.push(emp);
            break;
          }
        }
      }

      setFilteredList(search_results);
    }
  };

  return (
    <div className="employees-page">
      <EmployeeFilter onFilter={filterHandler} />
      <ObjectsList>
        <ul>
          <div className="object-search">
            <ObjectSearch
              search={searchHandler}
              searchMessage={"Найти сотрудника"}
            />
            <button>Зарегистрировать сотрудника</button>
          </div>
          {searchedList?.map((item) => (
            <Employee key={item.id} data={item} />
          ))}
        </ul>
        {searchedList.length === 0 && <p id="message">Нет совпадений</p>}
      </ObjectsList>
    </div>
  );
};

export default EmployeesPage;
