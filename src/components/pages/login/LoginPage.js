import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import Logo from "../../layout/Logo";
import background from "./loginImgs/backgroundImg.jpg";
import "./loginStyles/LoginPage.css";
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
  }, [user]);

  return (
    <div className="login-page">
      <img src={background} />
      <Logo />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
