import React, { useEffect, useState } from "react";

import ObjectFilterSmall from "../../../cards/ObjectFilterSmall";
import RoleSelectList from "./RoleSelector";

const EmployeeFilterSmall = ({ onFilter, isVisible }) => {
  // хранения количества полей для выбора роли
  const defaultRoleValue = "Выбрать";
  const [extraRoles, setExtraRoles] = useState([]);
  const secondaryType = "role-select ";
  const primeType = "role-select-small ";
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

  // хранения инициализационных значений
  const [defaulRoles, setDefualtRoles] = useState([]);
  // клонируем большой фильтр если он есть
  useEffect(() => {
    if (smallVisible) {
      let roles = [];
      let extraRoles = [];
      let index = 0;
      let roleSelector = document.getElementById(secondaryType + index);
      while (roleSelector) {
        if (index) {
          extraRoles.push(index);
        }
        roles.push(roleSelector.value);

        index += 1;
        roleSelector = document.getElementById(secondaryType + index);
      }
      setExtraRoles(extraRoles);
      setDefualtRoles(roles.length === 0 ? [defaultRoleValue] : roles);
    }
  }, [smallVisible]);

  useEffect(() => {
    let index = 0;
    for (let role of defaulRoles) {
      if (extraRoles.length !== 0 || index === 0) {
        document.getElementById(primeType + index).value = role;
        index += 1;
      }
    }
  }, [defaulRoles]);

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
      newFilterConfig.roles = [document.getElementById(primeType + 0).value];
      for (let index of extraRoles) {
        newFilterConfig.roles.push(
          document.getElementById(primeType + index).value
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

  return (
    <ObjectFilterSmall clearHandler={clearHandler} isVisible={isVisible}>
      <label>Сотрудник:</label>
      <div className="multiple-input__container">
        <RoleSelectList
          filterHandler={filterHandler}
          extraRoles={extraRoles}
          setExtraRoles={setExtraRoles}
          filterConfig={filterConfig}
          setFilterConfig={setFilterConfig}
          defaultValue={defaultRoleValue}
          isSmall={true}
          onFilter={onFilter}
        />
      </div>
    </ObjectFilterSmall>
  );
};

export default EmployeeFilterSmall;
