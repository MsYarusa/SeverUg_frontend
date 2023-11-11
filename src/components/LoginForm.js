import React, { useState } from "react";
import checkPassword_button from "./passwordImg.svg";
import "./LoginForm.css";
import axios from "axios";

const LoginFrom = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const changeLoginHandler = (event) => {
    setLogin(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmited(true);

    axios
      // "http://194.35.119.103/apishechka/login"
      .post("https://jsonplaceholder.typicode.com/posts", {
        login: login,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setLogin("");
    setPassword("");
  };

  return (
    <div className="login-window">
      <div className="login-window__card">
        <form className="login-form" onSubmit={submitHandler}>
          <label>Вход</label>
          <input
            type="text"
            id="login"
            placeholder="Логин"
            value={login}
            onChange={changeLoginHandler}
          ></input>
          <div id="password-input">
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              value={password}
              onChange={changePasswordHandler}
            ></input>
            <div type="button" id="checkPassword">
              <img src={checkPassword_button} alt={"check"} />
            </div>
          </div>
          <button type="submit>" id="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginFrom;
