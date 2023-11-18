import React from "react";
import Logo from "./Logo";
import userImg from "./userImg.svg";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <header className="header">
      <Logo />
      <div id="user">
        <img src={userImg} alt="user" />
        <p>
          {user.last_name} {user.first_name}
        </p>
      </div>
    </header>
  );
};

export default Header;
