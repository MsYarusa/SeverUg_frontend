import React from "react";
import Logo from "./Logo";
import user from "./userImg.svg";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <Logo />
      <div id="user">
        <img src={user} alt="user" />
        <p>
          {props.lastName} {props.firstName}
        </p>
      </div>
    </div>
  );
};

export default Header;
