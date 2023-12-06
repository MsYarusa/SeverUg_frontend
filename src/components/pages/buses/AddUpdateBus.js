import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putBus } from "../../../store/requests/BusesRequests";
import { postBus } from "../../../store/requests/BusesRequests";

import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./busesStyles/AddUpdateBus.css";

const AddUpdateBus = ({ cancelHandler, data }) => {
  // получение данных из стора
  const models = useSelector((state) => state.buses.models);

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // наполнение инпутов данными
  useEffect(() => {
    if (data) {
      document.getElementById("bus-model").value = data.model;
      document.getElementById("bus-code").value = data.code;
    }
  }, [data]);

  const dispatch = useDispatch();
  // ВАЛИДАЦИЯ
  //флаги успешной валидации
  const [modelOk, setModelOk] = useState(true);
  const [codeOk, setCodeOk] = useState(true);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    let model = document.getElementById("bus-model").value;
    let code = document.getElementById("bus-code").value;

    // поднятие флагов в случае некорректных входных данных
    let modelOk = model !== "Выбрать";
    let codeOk = code !== "";

    // сохранение флагов
    setModelOk(modelOk);
    setCodeOk(codeOk);

    // если данные корректны, то происходит отправка запроса
    if (modelOk && codeOk) {
      const newBus = {
        model: model,
        code: code,
        status: "active",
        numberOfSits: model === "HONDA" ? 52 : 43,
      };
      if (data) {
        //если был указан сотрудник, то его данные обновляются
        // console.log({
        //   id: data.id,
        //   employee: newBus,
        // });
        dispatch(
          putBus({
            id: data.id,
            employee: newBus,
          })
        );
      } else {
        // если начальные значения не были указаны, то создается новый сотрудник
        // console.log({
        //   employee: newBus,
        // });
        dispatch(
          postBus({
            employee: newBus,
          })
        );
      }
      //закрытие окна
      cancelHandler();
    }
  };

  return (
    <AddUpdateObject
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      errorMessage={() => {
        return "no error";
      }}
      noErrors={true}
    >
      <label id="main">
        {data ? "Изменение данных автобуса" : "Регистрация автобуса"}
      </label>
      <div className="label-input bus-input">
        <label>Модель автобуса: </label>
        <select
          id="bus-model"
          defaultValue={"Выбрать"}
          className={modelOk ? "base-border" : "error-border"}
        >
          <option disabled value={"Выбрать"}>
            Выбрать
          </option>
          {models?.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div className="label-input bus-input">
        <label>Регистрационный номер:</label>
        <input
          type="text"
          id="bus-code"
          className={codeOk ? "base-border" : "error-border"}
        />
      </div>
    </AddUpdateObject>
  );
};

export default AddUpdateBus;
