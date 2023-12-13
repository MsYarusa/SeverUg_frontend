import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import {
  putDriver,
  putEmployee,
  postEmployee,
  postDriver,
  updateAuthEmployee,
  updateAuthDriver,
} from "../../../store/requests/EmployeesRequests";
import { translateRole, rolesEN } from "../../../extraFunctions/ExtraFunctions";
import { SHA256 } from "crypto-js";

import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./employeesStyles/AddUpdateEmployee.css";

const AddUpdateEmployee = ({ cancelHandler, data }) => {
  //ДОП ДАННЫЕ
  //переменная хранящая выбранную в данные момент роль
  const [selectedRole, setSelectedRole] = useState(null);

  const selectRoleHandler = (event) => {
    let role = event.target.value;
    setSelectedRole(role);
  };

  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // наполнение инпутов данными
  const [driverIdRendered, setDriverIdRendered] = useState(false);

  useEffect(() => {
    if (data) {
      setSelectedRole(data.role);
      setDriverIdRendered(true);
    }
  }, []);

  useEffect(() => {
    if (data && driverIdRendered) {
      document.getElementById("employee-first-name").value = data.first_name;
      document.getElementById("employee-last-name").value = data.last_name;
      document.getElementById("employee-father-name").value = data.father_name
        ? data.father_name
        : "";
      document.getElementById("employee-role").value = data.role;

      document.getElementById("employee-email").value = data.email
        ? data.email
        : "";
      document.getElementById("employee-phone").value = data.phone_number
        ? data.phone_number
        : "";
      console.log("1", document.getElementById("employee-phone").value);
      if (data.role === "driver") {
        document.getElementById("employee-driver_id").value = data.driver_id;
      }
    }
  }, [driverIdRendered]);

  //ИЗМЕНЕНИЕ ПАРОЛЯ
  // хранение флага на изменение пароля
  const [changePassword, setChangePassword] = useState(false);

  // добавление возможности изменения пароля
  const changePasswordHandler = () => {
    setChangePassword(!changePassword);
  };

  const dispatch = useDispatch();
  // ВАЛИДАЦИЯ
  //флаги успешной валидации
  const [firstNameOk, setFirstNameOk] = useState(true);
  const [lastNameOk, setLastNameOk] = useState(true);
  const [roleOk, setRoleOk] = useState(true);
  const [loginOk, setLoginOk] = useState(true);
  const [passwordNotEmpty, setPasswordNotEmpty] = useState(true);
  const [confirmFailed, setConfirmFailed] = useState(false);
  const [driverIdOk, setDriverIdOk] = useState(true);

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    let firstName = document.getElementById("employee-first-name").value;
    let lastName = document.getElementById("employee-last-name").value;
    let fatherName = document.getElementById("employee-father-name").value;
    let role = document.getElementById("employee-role").value;
    let email = document.getElementById("employee-email").value;
    let phone = document.getElementById("employee-phone").value;
    let driverId = "11 11 111111";
    let login = null;
    let password = null;
    let passwordConfiirmation = null;

    if (role === "driver") {
      driverId = document.getElementById("employee-driver_id").value;
    }
    if (!data || changePassword) {
      login = document.getElementById("employee-login").value;
      password = document.getElementById("employee-password").value;
      passwordConfiirmation = document.getElementById(
        "employee-password-confirmation"
      ).value;
    }

    // поднятие флагов в случае некорректных входных данных
    let firstNameOk = firstName !== "";
    let lastNameOk = lastName !== "";
    let roleOk = role !== "Должность";
    let loginOk = login !== "";
    let passwordNotEmpty = password !== "";
    let confirmFailed = password !== passwordConfiirmation;
    let driverIdOk = driverId !== "";

    password = SHA256(password);

    // сохранение флагов
    setFirstNameOk(firstNameOk);
    setLastNameOk(lastNameOk);
    setRoleOk(roleOk);
    setLoginOk(loginOk);
    setPasswordNotEmpty(passwordNotEmpty);
    setConfirmFailed(confirmFailed);
    setDriverIdOk(driverIdOk);

    // если данные корректны, то происходит отправка запроса
    if (
      firstNameOk &&
      lastNameOk &&
      roleOk &&
      loginOk &&
      passwordNotEmpty &&
      driverIdOk &&
      !confirmFailed
    ) {
      if (role === "driver") {
        const newDriver = {
          driver_id: driverId,
          login: data ? null : login,
          password: data ? null : password,
          first_name: firstName,
          last_name: lastName,
          father_name: fatherName,
          email: email,
          phone_number: phone,
          role: "driver",
        };

        if (data) {
          dispatch(
            putDriver({
              id: data.id,
              driver: newDriver,
            })
          );
          dispatch(
            updateAuthDriver({
              id: data.id,
              login: login,
              password: password,
            })
          );
          if (changePassword) {
          }
        } else {
          dispatch(
            postDriver({
              driver: newDriver,
            })
          );
        }
      } else {
        const newEmployee = {
          role: role,
          first_name: firstName,
          last_name: lastName,
          father_name: fatherName,
          email: email,
          phone_number: phone,
          login: data ? null : login,
          password: data ? null : password,
        };
        if (data) {
          //если был указан сотрудник, то его данные обновляются
          dispatch(
            putEmployee({
              id: -data.id,
              employee: newEmployee,
            })
          );
          dispatch(
            updateAuthEmployee({
              id: -data.id,
              login: login,
              password: password,
            })
          );
        } else {
          // если начальные значения не были указаны, то создается новый сотрудник
          dispatch(
            postEmployee({
              employee: newEmployee,
            })
          );
        }
      }

      //закрытие окна
      cancelHandler();
    }
  };
  // функция выводящая тип ошибки в случае некорретных входных данных
  const errorMessage = () => {
    return "Пароли не совпадают";
  };
  return (
    <AddUpdateObject
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
      errorMessage={errorMessage}
      noErrors={!confirmFailed}
    >
      <label id="main">
        {data ? "Изменение данных сотрудника" : "Регистрация сотрудника"}
      </label>
      <label className="secondary-label">Персональные данные</label>
      <div id="personal-data" className="employee-inputs">
        <input
          id="employee-last-name"
          type="text"
          placeholder="Фамилия"
          className={lastNameOk ? "base-border" : "error-border"}
          autoComplete="off"
        />
        <input
          id="employee-first-name"
          type="text"
          placeholder="Имя"
          className={firstNameOk ? "base-border" : "error-border"}
          autoComplete="off"
        />
        <input
          id="employee-father-name"
          type="text"
          placeholder="Отчество (при наличии)"
          autoComplete="off"
        />
        <select
          id="employee-role"
          defaultValue={"Должность"}
          className={roleOk ? "base-border" : "error-border"}
          onChange={selectRoleHandler}
        >
          <option disabled value={"Должность"}>
            Должность
          </option>
          {rolesEN?.map((role) => (
            <option key={role} value={role}>
              {translateRole(role)}
            </option>
          ))}
        </select>
        {selectedRole === "driver" && (
          <InputMask
            mask="99 99 999999"
            id="employee-driver_id"
            type="text"
            className={driverIdOk ? "base-border" : "error-border"}
            placeholder="Водительское удостоверение (серия и номер)"
            autoComplete="off"
          />
        )}
      </div>

      <label className="secondary-label">Контактные данные</label>
      <div id="contact-data" className="employee-inputs">
        <input
          id="employee-email"
          type="text"
          placeholder="Электронная почта"
          autoComplete="off"
        />
        <InputMask
          mask="+7 (999) 999-99-99"
          id="employee-phone"
          type="text"
          placeholder="Мобильный номер"
          autoComplete="off"
        />
      </div>
      <label className="secondary-label">Данные авторизации</label>
      <div id="auth-data" className="employee-inputs">
        {data && !changePassword && (
          <>
            <button
              id="change-password"
              type="button"
              onClick={changePasswordHandler}
            >
              Изменить данные авторизации
            </button>
          </>
        )}
        {!data && (
          <>
            <input
              id="employee-login"
              type="text"
              placeholder="Логин"
              autoComplete="off"
              name="user-login"
              className={loginOk ? "base-border" : "error-border"}
            />
            <PasswordInputs
              passwordNotEmpty={passwordNotEmpty}
              confirmFailed={confirmFailed}
            />
          </>
        )}
        {changePassword && (
          <>
            <button
              id="change-password"
              type="button"
              onClick={changePasswordHandler}
            >
              Отмена
            </button>
            <input
              id="employee-login"
              type="text"
              placeholder="Логин"
              autoComplete="off"
              name="user-login"
              className={loginOk ? "base-border" : "error-border"}
            />
            <PasswordInputs
              passwordNotEmpty={passwordNotEmpty}
              confirmFailed={confirmFailed}
            />
          </>
        )}
      </div>
    </AddUpdateObject>
  );
};

export default AddUpdateEmployee;

const PasswordInputs = ({ passwordNotEmpty, confirmFailed }) => {
  return (
    <div className="employee-inputs password-inputs">
      <input
        id="employee-password"
        type="password"
        placeholder="Пароль"
        autoComplete="new-password"
        name="user-password"
        className={
          passwordNotEmpty && !confirmFailed ? "base-border" : "error-border"
        }
      />
      <input
        id="employee-password-confirmation"
        type="password"
        placeholder="Подтвердите пароль"
        autoComplete="new-password"
        className={
          passwordNotEmpty && !confirmFailed ? "base-border" : "error-border"
        }
      />
    </div>
  );
};
