import React, { useState } from "react";
import ObjectFilter from "../../cards/ObjectFilter";
import { useSelector } from "react-redux";
import { translateRole, rolesEN } from "../../../extraFunctions/ExtraFunctions";

import cancelImg from "../../cards/buttonImgs/close.svg";

const EmployeeFilter = ({ onFilter }) => {
  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({ roles: [] });

  // обработка инпутов фильтров
  const filterHandler = (event) => {
    // получаем id элемента в котором произошли изменения
    let id = event.target.id;

    // создаем переменную куда будем сохранять новые параметры
    let newFilterConfig = filterConfig;

    // в зависимости от типа инпута сохраняем значение в соответствующее поле
    if (id.indexOf("role-select") !== -1) {
      newFilterConfig.roles = [
        document.getElementById("role-select " + 0).value,
      ];
      for (let index of extraRoles) {
        newFilterConfig.roles.push(
          document.getElementById("role-select " + index).value
        );
      }
    }
    // изменяем старые параметры в соответствии с новыми
    setFilterConfig(newFilterConfig);
    // передаем параметры родителю
    onFilter(newFilterConfig);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newFilterConfig = {
      roles: [],
    };
    setFilterConfig(newFilterConfig);
    setExtraRoles([]);
    // отправка новых параметров родителю
    onFilter(newFilterConfig);
  };

  // ВЫБОР РОЛИ
  // хранения количества полей для выбора роли
  const [extraRoles, setExtraRoles] = useState([]);

  // добавление роли
  const addRoleHandler = () => {
    setExtraRoles([...extraRoles, extraRoles.length + 1]);
  };

  //удаление роли
  const deleteRoleHandler = (event) => {
    //сохраняем все роли кроме удаленной
    let rolesForSave =
      event.target.id !== "0"
        ? [document.getElementById("role-select " + 0).value]
        : [];
    for (let index of extraRoles) {
      if (event.target.id !== index.toString()) {
        rolesForSave.push(
          document.getElementById("role-select " + index).value
        );
      }
    }
    // изменяем список описывающий количество полей
    let extraRolesNew = extraRoles.slice(0, -1);
    setExtraRoles(extraRolesNew);

    // вводим значения сохраненных ролей в оставшиеся поля инпутов
    document.getElementById("role-select " + 0).value = rolesForSave[0];
    for (let index of extraRolesNew) {
      document.getElementById("role-select " + index).value =
        rolesForSave[index];
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (rolesForSave.find((role) => role !== "Выбрать")) {
      onlyDefault = false;
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.roles = onlyDefault ? rolesEN : rolesForSave;
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <ObjectFilter clearHandler={clearHandler}>
      <RoleSelect
        key={0}
        index={0}
        defaultValue="Выбрать"
        deleteHandler={deleteRoleHandler}
        onChange={filterHandler}
        isOnly={!extraRoles.length}
      />
      {extraRoles.length !== 0 &&
        extraRoles.map((index) => (
          <RoleSelect
            key={index}
            index={index}
            defaultValue="Выбрать"
            deleteHandler={deleteRoleHandler}
            onChange={filterHandler}
            isOnly={0}
          />
        ))}
      <button id="add-filter" onClick={addRoleHandler}>
        Добавить фильтр
      </button>
    </ObjectFilter>
  );
};

export default EmployeeFilter;

// компонент отвечающий за выбор роли
const RoleSelect = ({
  index,
  defaultValue,
  deleteHandler,
  onChange,
  isOnly,
}) => {
  return (
    <div className="extra-input" id={"role " + index}>
      <label>Должность:</label>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        id={"role-select " + index}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {rolesEN?.map((role) => (
          <option key={role + index} value={role}>
            {translateRole(role)}
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
