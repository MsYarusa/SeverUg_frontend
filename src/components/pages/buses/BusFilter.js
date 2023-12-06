import React, { useState } from "react";
import ObjectFilter from "../../cards/ObjectFilter";
import { useSelector } from "react-redux";

import cancelImg from "../../cards/buttonImgs/close.svg";

const BusFilter = ({ onFilter }) => {
  // ПОЛУЧЕНИЕ ДАННЫХ ИЗ СТОРА
  const models = useSelector((state) => state.buses.models);

  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({
    models: [],
    driverStatus: "Любой",
    busStatus: "Любой",
  });

  // обработка инпутов фильтров
  const filterHandler = (event) => {
    // получаем id элемента в котором произошли изменения
    let id = event.target.id;

    // создаем переменную куда будем сохранять новые параметры
    let newFilterConfig = filterConfig;

    // в зависимости от типа инпута сохраняем значение в соответствующее поле
    if (id.indexOf("model-select") !== -1) {
      newFilterConfig.models = [
        document.getElementById("model-select " + 0).value,
      ];
      for (let index of extraModelFilter) {
        newFilterConfig.models.push(
          document.getElementById("model-select " + index).value
        );
      }
    }
    if (id.indexOf("driverStatus") !== -1) {
      newFilterConfig.driverStatus =
        document.getElementById("driverStatus").value;
    }
    if (id.indexOf("busStatus") !== -1) {
      newFilterConfig.busStatus = document.getElementById("busStatus").value;
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (newFilterConfig.models.find((model) => model !== "Выбрать")) {
      onlyDefault = false;
    }

    if (onlyDefault) {
      newFilterConfig.models = models;
    }
    // изменяем старые параметры в соответствии с новыми
    setFilterConfig(newFilterConfig);
    // передаем параметры родителю
    onFilter(newFilterConfig);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newFilterConfig = {
      models: [],
      driverStatus: "Любой",
      busStatus: "Любой",
    };
    setFilterConfig(newFilterConfig);
    setExtraModelFilter([]);
    // отправка новых параметров родителю
    onFilter(newFilterConfig);
  };

  // ВЫБОР МОДЕЛИ
  // хранения количества полей для выбора модели
  const [extraModelFilter, setExtraModelFilter] = useState([]);

  // добавление модели
  const addRoleHandler = () => {
    setExtraModelFilter([...extraModelFilter, extraModelFilter.length + 1]);
  };

  //удаление модели
  const deleteRoleHandler = (event) => {
    //сохраняем все модели кроме удаленной
    let modelsForSave =
      event.target.id !== "0"
        ? [document.getElementById("model-select " + 0).value]
        : [];
    for (let index of extraModelFilter) {
      if (event.target.id !== index.toString()) {
        modelsForSave.push(
          document.getElementById("model-select " + index).value
        );
      }
    }
    // изменяем список описывающий количество полей
    let extraModelFilterNew = extraModelFilter.slice(0, -1);
    setExtraModelFilter(extraModelFilterNew);

    // вводим значения сохраненных ролей в оставшиеся поля инпутов
    document.getElementById("model-select " + 0).value = modelsForSave[0];
    for (let index of extraModelFilterNew) {
      document.getElementById("model-select " + index).value =
        modelsForSave[index];
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (modelsForSave.find((model) => model !== "Выбрать")) {
      onlyDefault = false;
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.models = onlyDefault ? models : modelsForSave;
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <ObjectFilter clearHandler={clearHandler}>
      <label className="">Водитель:</label>
      <div className="extra-input">
        <label>Статус:</label>
        <select defaultValue="Любой" onChange={filterHandler} id="driverStatus">
          <option value="Любой">Любой</option>
          <option value="Не назначен">Не назначен</option>
          <option value="Назначен">Назначен</option>
        </select>
      </div>
      <label className="">Автобус:</label>
      <div className="extra-input">
        <label>Статус:</label>
        <select defaultValue="Любой" onChange={filterHandler} id="busStatus">
          <option value="Любой">Любой</option>
          <option value="На ремонте">На ремонте</option>
          <option value="Активен">Активен</option>
        </select>
      </div>
      <ModelSelect
        key={0}
        index={0}
        defaultValue="Выбрать"
        models={models}
        deleteHandler={deleteRoleHandler}
        onChange={filterHandler}
        isOnly={!extraModelFilter.length}
      />
      {extraModelFilter.length !== 0 &&
        extraModelFilter.map((index) => (
          <ModelSelect
            key={index}
            index={index}
            defaultValue="Выбрать"
            models={models}
            deleteHandler={deleteRoleHandler}
            onChange={filterHandler}
            isOnly={0}
          />
        ))}
      <button id="add-filter" onClick={addRoleHandler}>
        Добавить модель
      </button>
    </ObjectFilter>
  );
};

export default BusFilter;

// компонент отвечающий за выбор роли
const ModelSelect = ({
  index,
  defaultValue,
  models,
  deleteHandler,
  onChange,
  isOnly,
}) => {
  return (
    <div className="extra-input" id={"model " + index}>
      <label>Модель:</label>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        id={"model-select " + index}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {models?.map((model) => (
          <option key={model + index} value={model}>
            {model}
          </option>
        ))}
      </select>
      {!isOnly && (
        <button id={index.toString()} onClick={deleteHandler}>
          <img src={cancelImg} id={index.toString()} />
        </button>
      )}
    </div>
  );
};
