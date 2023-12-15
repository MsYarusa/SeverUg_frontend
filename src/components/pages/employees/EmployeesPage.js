import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../../store/requests/EmployeesRequests";
import { getDrivers } from "../../../store/requests/EmployeesRequests";
import { getBuses } from "../../../store/requests/BusesRequests";

import ObjectsPage from "../../cards/ObjectsPage";
import AddUpdateEmployee from "./AddUpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";
// import EmployeeFilter from "./EmployeeFilter";
import EmployeeFilter from "./EmployeeFilters/EmployeeFilter";
import EmployeesList from "./EmployeesList";
import "../../cards/objectStyles/ObjectsPage.css";

const EmployeesPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const employees = useSelector((state) => state.employees.employees);
  const drivers = useSelector((state) => state.employees.drivers);
  const buses = useSelector((state) => state.buses.buses);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(getEmployees());
    }
    if (drivers.length === 0) {
      dispatch(getDrivers());
    }
    if (buses.length === 0) {
      dispatch(getBuses());
    }
  }, []);

  const [allEmployees, setAllEmployees] = useState([]);
  useEffect(() => {
    setAllEmployees([...employees, ...drivers]);
  }, [employees, drivers]);

  // ПОИСК И ФИЛЬТР
  // хранение отфильтрованного списка
  const [searchedList, setSearchedList] = useState(allEmployees);
  const [filteredList, setFilteredList] = useState(allEmployees);
  // сохранение параметров фильтра
  const [savedFilteredConfig, setSavedFilteredConfig] = useState({
    roles: [],
  });

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setSearchedList(allEmployees);
    setFilteredList(allEmployees);
  }, [allEmployees]);

  // после поиска необходимо отфильтровать список с учетом сохраненных параметров
  useEffect(() => {
    filterHandler(savedFilteredConfig);
  }, [searchedList]);

  // поиск (фильтрация по названию)
  const searchHandler = (searchConfig) => {
    // предобработка параметров поиска
    let configData = searchConfig.split(" ");
    configData = configData.filter((item) => item !== "");

    // массив для сохранения результатов поиска
    let search_results = [];
    // пробегаемся по всем сотрудникам и проверяем их на соответствие параметрам
    for (let emp of allEmployees) {
      // получем фамилию, имя, отчество сотрудников и сохраняем их в список
      let lastName = emp.last_name.toLowerCase().split(" ");
      let firstName = emp.first_name.toLowerCase().split(" ");
      let fatherName = emp.father_name
        ? emp.father_name.toLowerCase().split(" ")
        : "";
      let empData = [...lastName, ...firstName, ...fatherName];
      empData.filter((item) => item !== "");
      // копируем данные фильтра
      let configDataCopy = [...configData];
      //пробегаемся по всем полям сотрудника и смотрим на совпадения с параметрами
      //если совпадение найдено то удаляем и поле сотрудника и строку из списка скопированных параметров
      for (let i = 0; i < configData.length; i++) {
        for (let j = 0; j < empData.length; j++) {
          if (!empData[j].indexOf(configData[i])) {
            configDataCopy.splice(configDataCopy.indexOf(configData[i]), 1);
            empData.splice(j, 1);
            break;
          }
        }
      }

      // если список скопированных параметров опустел, значит все найдено
      if (!configDataCopy.length) {
        search_results.push(emp);
      }
    }

    setSearchedList(search_results);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let search_results = [];
    setSavedFilteredConfig(filterConfig);
    // если к нам пришел пустой список параметров, то отображаем всух сотрудников
    if (!filterConfig.roles.length) {
      setFilteredList(searchedList);
    } else {
      // если он не пуст, то пробегаемся по всем сотрудникам и проверяем их роль с выбраной
      for (let emp of searchedList) {
        for (let role of filterConfig.roles) {
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
    <ObjectsPage
      AddUpdateObject={AddUpdateEmployee}
      DeleteObject={DeleteEmployee}
      ObjectFilter={EmployeeFilter}
      ObjectsList={EmployeesList}
      filterHandler={filterHandler}
      searchHandler={searchHandler}
      list={filteredList}
      objects={allEmployees}
    />
  );
};

export default EmployeesPage;
