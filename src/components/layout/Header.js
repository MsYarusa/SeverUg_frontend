import React, { useState } from "react";
import Logo from "./Logo";
import userImg from "./userImg.svg";
import logOut from "./LogOut.svg";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const clickHandler = () => {
    setUserInfoOpen(!userInfoOpen);
  };

  return (
    <>
      <header className="header">
        <Logo />
        <div id="user">
          <img src={userImg} alt="user" />
          <p>
            {user.last_name} {user.first_name}
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
