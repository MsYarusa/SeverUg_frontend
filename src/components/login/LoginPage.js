import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import Logo from "../layout/Logo";
import "./LoginPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(fromPage, { replace: true });
    }
  }, []);

  return (
    <div className="login-page">
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
