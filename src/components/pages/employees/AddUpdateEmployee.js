import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { putEmployee } from "../../../store/requests/EmployeesRequests";
import { postEmployee } from "../../../store/requests/EmployeesRequests";
import { translateRole, rolesRU } from "../../../extraFunctions/ExtraFunctions";

import AddUpdateObject from "../../cards/AddUpdateDeleteObjects";

import "./employeesStyles/AddUpdateEmployee.css";

const AddUpdateEmployee = ({ cancelHandler, data }) => {
  // УСТАНОВЛЕНИЕ НАЧАЛЬНЫХ ЗНАЧЕНИЙ (в случае их получения)
  // наполнение инпутов данными
  useEffect(() => {
    if (data) {
      document.getElementById("employee-first-name").value = data.first_name;
      document.getElementById("employee-last-name").value = data.last_name;
      document.getElementById("employee-father-name").value = data.father_name
        ? data.father_name
        : "";
      document.getElementById("employee-role").value = translateRole(data.role);
      document.getElementById("employee-email").value = data.email
        ? data.email
        : "";
      // document.getElementById("employee-phone").value = data.phone
      //   ? data.phone
      //   : "";
      // document.getElementById("employee-login").value = data.login;
    }
  }, [data]);

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

  //валидация и отправка формы
  const submitHandler = (event) => {
    event.preventDefault();

    let firstName = document.getElementById("employee-first-name").value;
    let lastName = document.getElementById("employee-last-name").value;
    let fatherName = document.getElementById("employee-father-name").value;
    let role = document.getElementById("employee-role").value;
    let email = document.getElementById("employee-email").value;
    let phone = document.getElementById("employee-phone").value;
    let login = document.getElementById("employee-login").value;
    let password = null;
    let passwordConfiirmation = null;
    if (!data || changePassword) {
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
    let passwordNotEmpty = password !== "" || data;
    let confirmFailed = password !== passwordConfiirmation;

    // сохранение флагов
    setFirstNameOk(firstNameOk);
    setLastNameOk(lastNameOk);
    setRoleOk(roleOk);
    setLoginOk(loginOk);
    setPasswordNotEmpty(passwordNotEmpty);
    setConfirmFailed(confirmFailed);

    // если данные корректны, то происходит отправка запроса
    if (
      firstNameOk &&
      lastNameOk &&
      roleOk &&
      loginOk &&
      passwordNotEmpty &&
      !confirmFailed
    ) {
      const newEmployee = {
        role: translateRole(role),
        first_name: firstName,
        last_name: lastName,
        father_name: fatherName,
        email: email,
        phone: phone,
        login: data ? (login ? login : "defaultLogin") : login,
        password: data ? (password ? password : "1234567890") : password,
      };
      if (data) {
        //если был указан сотрудник, то его данные обновляются
        // console.log({
        //   id: data.id,
        //   employee: newEmployee,
        // });
        dispatch(
          putEmployee({
            id: data.id,
            employee: newEmployee,
          })
        );
      } else {
        // если начальные значения не были указаны, то создается новый сотрудник
        // console.log({
        //   employee: newEmployee,
        // });
        dispatch(
          postEmployee({
            employee: newEmployee,
          })
        );
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
        >
          <option disabled value={"Должность"}>
            Должность
          </option>
          {rolesRU?.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <label className="secondary-label">Контактные данные</label>
      <div id="contact-data" className="employee-inputs">
        <input
          id="employee-email"
          type="text"
          placeholder="Электронная почта"
          autoComplete="off"
        />
        <input
          id="employee-phone"
          type="text"
          placeholder="8 999 999 99 99"
          autoComplete="off"
        />
      </div>
      <label className="secondary-label">Данные авторизации</label>
      <div id="auth-data" className="employee-inputs">
        <input
          id="employee-login"
          type="text"
          placeholder="Логин"
          autoComplete="off"
          name="user-login"
          className={loginOk ? "base-border" : "error-border"}
        />
        {!data && (
          <PasswordInputs
            passwordNotEmpty={passwordNotEmpty}
            confirmFailed={confirmFailed}
          />
        )}
      </div>

      {data && !changePassword && (
        <>
          <button
            id="change-password"
            type="button"
            onClick={changePasswordHandler}
          >
            Изменить пароль
          </button>
        </>
      )}
      {changePassword && (
        <PasswordInputs
          passwordNotEmpty={passwordNotEmpty}
          confirmFailed={confirmFailed}
        />
      )}
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
