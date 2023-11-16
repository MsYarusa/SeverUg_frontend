import React from "react";
import logo from "./logoImg.svg";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-block">
      <img src={logo} alt={"Лого"} />
      <p>
        Автотранспортное предприятие <br />
        "Север-Юг"
      </p>
    </div>
  );
};

export default Logo;
