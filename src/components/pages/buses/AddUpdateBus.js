import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putBus } from "../../../store/requests/BusesRequests";
import { postBus } from "../../../store/requests/BusesRequests";

import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./busesStyles/AddUpdateBus.css";

const AddUpdateBus = ({ cancelHandler, data }) => {
  // получение данных из стора
  const models = useSelector((state) => state.buses.models);
  const [modelLables, setModelLabels] = useState([]);

  useEffect(() => {
    let modelLables = [];
    models.forEach((model, i, arr) => {
      modelLables.push(model.model);
    });
    setModelLabels(modelLables);
  }, []);

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // наполнение инпутов данными
  useEffect(() => {
    if (data) {
      document.getElementById("bus-model").value = data.model;
      document.getElementById("bus-code").value = data.code;
      console.log(data.model);
    }
  }, [modelLables]);

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
    let status = data ? document.getElementById("bus-status").value : "active";

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
        status: status,
      };
      if (data) {
        //если был указан сотрудник, то его данные обновляются
        // console.log({
        //   id: data.id,
        //   bus: newBus,
        // });
        dispatch(
          putBus({
            id: data.id,
            bus: newBus,
          })
        );
      } else {
        // если начальные значения не были указаны, то создается новый сотрудник
        // console.log({
        //   bus: newBus,
        // });
        dispatch(
          postBus({
            bus: newBus,
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
      label={data ? "Изменение данных автобуса" : "Регистрация автобуса"}
    >
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
          {modelLables?.map((model) => (
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
          placeholder="Номер"
        />
      </div>
      {data && (
        <div className="label-input bus-input">
          {" "}
          <label>Статус автобуса: </label>
          <select id="bus-status" defaultValue="active">
            <option value="active">активный</option>
            <option value="unactive">на ремонте</option>
          </select>
        </div>
      )}
    </AddUpdateObject>
  );
};

export default AddUpdateBus;
