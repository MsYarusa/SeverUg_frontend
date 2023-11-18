import React, { useState } from "react";
import makePasswordVisible_active from "./passImgVis.svg";
import makePasswordVisible_unactive from "./passImgUnvis.svg";
import "./LoginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { getUser } from "./GetUser";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.user.status);
  console.log(status);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  const changeLoginHandler = (event) => {
    setLogin(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const makePasswordVisibleHandler = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  if (status === "rejected" && !authFailed) {
    setAuthFailed(true);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(getUser({ login, password }));

    // if (login === "abobus" && password === "abobus") {
    //   let data = {
    //     token: "token",
    //     first_name: "Abobus",
    //     last_name: "banfuciy",
    //     role: "directior",
    //   };
    //   dispatch(setUser(data));
    // } else {
    //   setAuthFailed(true);
    // }

    // axios
    //   .post("https://spacekot.ru/apishechka/login", {
    //     login: login,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     props.getData(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setAuthFailed(true);
    // });

    // setLogin("");
    // setPassword("");
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
            onChange={changeLoginHandler}
          ></input>
          <div id="password-input">
            <input
              className={authFailed ? "auth-failed" : ""}
              type={passwordIsVisible ? "text" : "password"}
              id="password"
              placeholder="Пароль"
              value={password}
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