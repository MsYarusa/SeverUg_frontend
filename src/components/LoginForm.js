import React from "react";
import checkPassword_button from "./passwordImg.svg";
import "./LoginForm.css";

const LoginFrom = () => {
  return (
    <div className="login-window">
      <div className="login-window__card">
        <form className="login-form">
          <label>Вход</label>
          <input type="text" id="login" placeholder="Логин"></input>
          <div id="password-input">
            <input type="password" id="password" placeholder="Пароль"></input>
            <buttom type="button" id="checkPassword">
              <img src={checkPassword_button} alt={"check"} />
            </buttom>
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
