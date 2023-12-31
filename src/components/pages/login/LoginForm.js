import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/requests/UserRequest";

import makePasswordVisible_active from "./loginImgs/passImgVis.svg";
import makePasswordVisible_unactive from "./loginImgs/passImgUnvis.svg";
import "./loginStyles/LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  if (status === "rejected" && !authFailed) {
    setAuthFailed(true);
  }

  const changeLoginHandler = (event) => {
    setLogin(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const makePasswordVisibleHandler = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getUser({ login, password }));
  };

  return (
    <div className="login-window">
      <div className="login-window__card">
        <form className="login-form" onSubmit={submitHandler}>
          <label>Вход</label>
          <input
            className={authFailed ? "auth-failed" : ""}
            type="text"
            id="login"
            placeholder="Логин"
            value={login}
            autoComplete="username"
            onChange={changeLoginHandler}
          ></input>
          <div id="password-input">
            <input
              className={authFailed ? "auth-failed" : ""}
              type={passwordIsVisible ? "text" : "password"}
              id="password"
              placeholder="Пароль"
              value={password}
              autoComplete="current-password"
              onChange={changePasswordHandler}
            ></input>
            <button
              type="button"
              id="makePasswordVisible"
              onClick={makePasswordVisibleHandler}
            >
              {passwordIsVisible ? (
                <img
                  src={makePasswordVisible_unactive}
                  alt={"makePasswordVisible_unact"}
                />
              ) : (
                <img
                  src={makePasswordVisible_active}
                  alt={"makePasswordVisible_act"}
                />
              )}
            </button>
          </div>
          <button type="submit>" id="submit">
            Войти
          </button>
          {authFailed && <p>Некорректный логин или пароль</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
