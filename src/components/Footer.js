import React from "react";
import "./Footer.css";

import phone from "./phoneImg.svg";
import email from "./emailImg.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div id="contacts">
        <img src={phone} alt="phone" />
        <p id="phone">8 924 265 34 10</p>
        <img src={email} alt="email" />
        <p id="email">severug@mail.ru</p>
      </div>
      <p id="info">@ 2020-2023 Автотранспортное предприятие ООО "Север-Юг"</p>
    </div>
  );
};

export default Footer;
