import React from "react";
import LoginForm from "./LoginForm";
import Logo from "../layout/Logo";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
