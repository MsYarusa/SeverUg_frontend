import React, { useEffect, useState } from "react";

import ObjectFilter from "../../cards/ObjectFilter";
import ObjectFilterSmall from "../../cards/ObjectFilterSmall";
import { useSelector } from "react-redux";

import cancelImg from "../../cards/buttonImgs/close.svg";
import { mode } from "crypto-js";

const BusesFilter = ({ onFilter, isSmall, isVisible }) => {
  // ПОЛУЧЕНИЕ ДАННЫХ ИЗ СТОРА
  const models = useSelector((state) => state.buses.models);
  const [modelLables, setModelLabels] = useState([]);

  useEffect(() => {
    let modelLables = [];
    models.forEach((model, i, arr) => {
      modelLables.push(model.model);
    });
    setModelLabels(modelLables);
  }, [models]);

  // хранения количества полей для выбора модели
  const [extraModelFilter, setExtraModelFilter] = useState([]);
  // тип
  const primeDriver = isSmall ? "driverStatus-small" : "driverStatus";
  const primeStatus = isSmall ? "busStatus-small" : "busStatus";
  const primeModel = isSmall ? "model-select-small " : "model-select ";

  const secondaryDriver = isSmall ? "driverStatus" : "driverStatus-small";
  const secondaryStatus = isSmall ? "busStatus" : "busStatus-small";
  const secondaryModel = isSmall ? "model-select " : "model-select-small ";

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

  // хранения значений
  const [defaultModels, setDefualtModels] = useState([]);
  // клонируем значения из другого фильтра в случае если размер экрана изменился
  useEffect(() => {
    if (smallVisible === isSmall) {
      let models = [];
      let extraModelFilter = [];
      let index = 0;
      let modelSelector = document.getElementById(secondaryModel + index);
      while (modelSelector) {
        if (index) {
          extraModelFilter.push(index);
        }

        models.push(modelSelector.value);

        index += 1;
        modelSelector = document.getElementById(secondaryModel + index);
      }
      setExtraModelFilter(extraModelFilter);
      setDefualtModels(models.length === 0 ? [""] : models);

      document.getElementById(primeDriver).value =
        document.getElementById(secondaryDriver).value;
      document.getElementById(primeStatus).value =
        document.getElementById(secondaryStatus).value;
    }
  }, [smallVisible]);

  useEffect(() => {
    let index = 0;
    for (let model of defaultModels) {
      if (extraModelFilter.length !== 0 || index === 0) {
        document.getElementById(primeModel + index).value = model;
        index += 1;
      }
    }
  }, [defaultModels]);

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
      newFilterConfig.models = [document.getElementById(primeModel + 0).value];
      for (let index of extraModelFilter) {
        newFilterConfig.models.push(
          document.getElementById(primeModel + index).value
        );
      }
    }
    if (id.indexOf("driverStatus") !== -1) {
      newFilterConfig.driverStatus = document.getElementById(primeDriver).value;
    }
    if (id.indexOf("busStatus") !== -1) {
      newFilterConfig.busStatus = document.getElementById(primeStatus).value;
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (newFilterConfig.models.find((model) => model !== "Выбрать")) {
      onlyDefault = false;
    }

    if (onlyDefault) {
      newFilterConfig.models = modelLables;
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

  // добавление модели
  const addRoleHandler = () => {
    setExtraModelFilter([...extraModelFilter, extraModelFilter.length + 1]);
  };

  //удаление модели
  const deleteRoleHandler = (event) => {
    //сохраняем все модели кроме удаленной
    let modelsForSave =
      event.target.id !== "0"
        ? [document.getElementById(primeModel + 0).value]
        : [];
    for (let index of extraModelFilter) {
      if (event.target.id !== index.toString()) {
        modelsForSave.push(document.getElementById(primeModel + index).value);
      }
    }
    // изменяем список описывающий количество полей
    let extraModelFilterNew = extraModelFilter.slice(0, -1);
    setExtraModelFilter(extraModelFilterNew);

    // вводим значения сохраненных ролей в оставшиеся поля инпутов
    document.getElementById(primeModel + 0).value = modelsForSave[0];
    for (let index of extraModelFilterNew) {
      document.getElementById(primeModel + index).value = modelsForSave[index];
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (modelsForSave.find((model) => model !== "Выбрать")) {
      onlyDefault = false;
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.models = onlyDefault ? modelLables : modelsForSave;
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <>
      {isSmall ? (
        <>
          <ObjectFilterSmall clearHandler={clearHandler} isVisible={isVisible}>
            <div className="multiple-input__container">
              <label>Водитель:</label>
              <div className="extra-input">
                <label>Статус:</label>
                <select
                  defaultValue="Любой"
                  onChange={filterHandler}
                  id={primeDriver}
                >
                  <option value="Любой">Любой</option>
                  <option value="Не назначен">Не назначен</option>
                  <option value="Назначен">Назначен</option>
                </select>
              </div>

              <label>Автобус:</label>
              <div className="extra-input">
                <label>Статус:</label>
                <select
                  defaultValue="Любой"
                  onChange={filterHandler}
                  id={primeStatus}
                >
                  <option value="Любой">Любой</option>
                  <option value="На ремонте">На ремонте</option>
                  <option value="Активен">Активен</option>
                </select>
              </div>
            </div>

            <label>Модель автобуса:</label>
            <div className="multiple-input__container">
              <ModelSelect
                key={0}
                index={0}
                defaultValue="Выбрать"
                models={modelLables}
                deleteHandler={deleteRoleHandler}
                onChange={filterHandler}
                isOnly={!extraModelFilter.length}
                primeModel={primeModel}
              />
              {extraModelFilter.length !== 0 &&
                extraModelFilter.map((index) => (
                  <ModelSelect
                    key={index}
                    index={index}
                    defaultValue="Выбрать"
                    models={modelLables}
                    deleteHandler={deleteRoleHandler}
                    onChange={filterHandler}
                    isOnly={0}
                    primeModel={primeModel}
                  />
                ))}
              <button id="add-filter" onClick={addRoleHandler}>
                Добавить модель
              </button>
            </div>
          </ObjectFilterSmall>
        </>
      ) : (
        <>
          <ObjectFilter clearHandler={clearHandler}>
            <label>Водитель:</label>
            <div className="extra-input">
              <label>Статус:</label>
              <select
                defaultValue="Любой"
                onChange={filterHandler}
                id={primeDriver}
              >
                <option value="Любой">Любой</option>
                <option value="Не назначен">Не назначен</option>
                <option value="Назначен">Назначен</option>
              </select>
            </div>
            <label>Автобус:</label>
            <div className="extra-input">
              <label>Статус:</label>
              <select
                defaultValue="Любой"
                onChange={filterHandler}
                id={primeStatus}
              >
                <option value="Любой">Любой</option>
                <option value="На ремонте">На ремонте</option>
                <option value="Активен">Активен</option>
              </select>
            </div>
            <ModelSelect
              key={0}
              index={0}
              defaultValue="Выбрать"
              models={modelLables}
              deleteHandler={deleteRoleHandler}
              onChange={filterHandler}
              isOnly={!extraModelFilter.length}
              primeModel={primeModel}
            />
            {extraModelFilter.length !== 0 &&
              extraModelFilter.map((index) => (
                <ModelSelect
                  key={index}
                  index={index}
                  defaultValue="Выбрать"
                  models={modelLables}
                  deleteHandler={deleteRoleHandler}
                  onChange={filterHandler}
                  isOnly={0}
                  primeModel={primeModel}
                />
              ))}
            <button id="add-filter" onClick={addRoleHandler}>
              Добавить модель
            </button>
          </ObjectFilter>
        </>
      )}
    </>
  );
};

export default BusesFilter;

// компонент отвечающий за выбор роли
const ModelSelect = ({
  index,
  defaultValue,
  models,
  deleteHandler,
  onChange,
  isOnly,
  primeModel,
}) => {
  return (
    <div className="extra-input" id={"model " + index}>
      <label>Модель:</label>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        id={primeModel + index}
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
