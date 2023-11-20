import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "./GetEmployees";

import EmployeeFilter from "./EmployeeFilter";
import EmployeesList from "./EmployeesList";
import "../cards/ObjectPage.css";

const EmployeesPage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [filteredList, setFilteredList] = useState(employees);
  const [searchedList, setSearchedList] = useState(employees);
  const [addEmployee, setAddEmployee] = useState(false, false, false);

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

  const addEmployeeHandler = () => {
    setAddEmployee(!addEmployee);
  };

  return (
    <div className="page">
      <EmployeeFilter onFilter={filterHandler} />
      <EmployeesList
        searchHandler={searchHandler}
        addEmployeeHandler={addEmployeeHandler}
        list={searchedList}
      />
      {/* {addEmployee && <Window></Window>} */}
    </div>
  );
};

export default EmployeesPage;
