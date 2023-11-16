import React from "react";
import LoginForm from "./LoginForm";
import Logo from "../Logo";
import "./LoginPage.css";

const LoginPage = (props) => {
  const getTokenAndRole = (data) => {
    props.sendTokenAndRole(data);
  };

  return (
    <div className="login-page">
      <Logo />
      <LoginForm getData={getTokenAndRole} />
    </div>
  );
};

export default LoginPage;
