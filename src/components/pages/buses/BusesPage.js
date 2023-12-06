import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBuses } from "../../../store/requests/BusesRequests";

import ObjectsPage from "../../cards/ObjectsPage";
import AddUpdateBus from "./AddUpdateBus";
import DeleteBus from "./DeleteBus";
import BusFilter from "./BusFilter";
import BusesList from "./BusesList";
import "../../cards/objectStyles/ObjectsPage.css";

const BusesPage = () => {
  //ДАННЫЕ
  // запрашиваем данные из стора
  const buses = useSelector((state) => state.buses.buses);

  // если стор пуст то делаем запрос на сервер
  const dispatch = useDispatch();
  useEffect(() => {
    if (buses.length === 0) {
      dispatch(getBuses());
    }
  }, []);

  // ПОИСК И ФИЛЬТР
  // хранение отфильтрованного списка
  const [searchedList, setSearchedList] = useState(buses);
  const [filteredList, setFilteredList] = useState(buses);
  // сохранение параметров фильтра
  const [savedFilteredConfig, setSavedFilteredConfig] = useState({
    models: [],
    driverStatus: "Любой",
    busStatus: "Любой",
  });

  // задаем начальные значения отфильтрованных списков
  useEffect(() => {
    setSearchedList(buses);
    setFilteredList(buses);
  }, [buses]);

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
    // пробегаемся по всем автобусам и проверяем их на соответствие параметрам
    for (let bus of buses) {
      // получем номер автобуса и ФИО водителя (при наличии) и сохраняем их в список
      let code = bus.code.toLowerCase();
      let busData = [code];
      if (bus.driver) {
        let firstName = bus.driver.first_name.toLowerCase().split(" ");
        let lastName = bus.driver.last_name.toLowerCase().split(" ");
        let fatherName = bus.driver.father_name
          ? bus.driver.father_name.toLowerCase().split(" ")
          : "";
        busData = [...busData, ...lastName, ...firstName, ...fatherName];
      }
      busData.filter((item) => item !== "");
      // копируем данные фильтра
      let configDataCopy = [...configData];
      //пробегаемся по всем полям автобуса и смотрим на совпадения с параметрами
      //если совпадение найдено то удаляем и поле автобуса и строку из списка скопированных параметров
      for (let i = 0; i < configData.length; i++) {
        for (let j = 0; j < busData.length; j++) {
          if (!busData[j].indexOf(configData[i])) {
            configDataCopy.splice(configDataCopy.indexOf(configData[i]), 1);
            busData.splice(j, 1);
            break;
          }
        }
      }

      // если список скопированных параметров опустел, значит все найдено
      if (!configDataCopy.length) {
        search_results.push(bus);
      }
    }

    setSearchedList(search_results);
  };

  // фильтр (фильтрация по характеристикам)
  const filterHandler = (filterConfig) => {
    let search_results = [];
    setSavedFilteredConfig(filterConfig);
    // если к нам пришел пустой список параметров, то отображаем все автобусы
    if (
      !filterConfig.models.length &&
      filterConfig.driverStatus === "Любой" &&
      filterConfig.busStatus === "Любой"
    ) {
      setFilteredList(searchedList);
    } else {
      // если он не пуст, то пробегаемся по всем автобусам и проверяем их соответствие параметрам
      for (let bus of searchedList) {
        // флаги хранящие соответстиве автобуса параметрам фильтра
        let modelOk = false;
        let driverStatusOk = false;
        let busStatusOk = false;
        // проверяем соответствие модели
        for (let model of filterConfig.models) {
          if (bus.model === model) {
            modelOk = true;
            break;
          }
        }
        switch (filterConfig.driverStatus) {
          case "Любой":
            driverStatusOk = true;
            break;
          case "Не назначен":
            driverStatusOk = bus.driver ? false : true;
            break;
          case "Назначен":
            driverStatusOk = bus.driver ? true : false;
            break;
        }

        switch (filterConfig.busStatus) {
          case "Любой":
            busStatusOk = true;
            break;
          case "На ремонте":
            busStatusOk = bus.status ? false : true;
            break;
          case "Активен":
            busStatusOk = bus.status ? true : false;
            break;
        }

        if (driverStatusOk && modelOk && busStatusOk) {
          search_results.push(bus);
        }
      }

      setFilteredList(search_results);
    }
  };

  return (
    <ObjectsPage
      AddUpdateObject={AddUpdateBus}
      DeleteObject={DeleteBus}
      ObjectFilter={BusFilter}
      ObjectsList={BusesList}
      filterHandler={filterHandler}
      searchHandler={searchHandler}
      list={filteredList}
      objects={buses}
    />
  );
};

export default BusesPage;
