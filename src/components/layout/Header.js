import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Logo from "./Logo";

import userImg from "./layoutImgs/userImg.svg";
import logOut from "./layoutImgs/LogOut.svg";
import dropdown from "./layoutImgs/dropdown.svg";
import dropup from "./layoutImgs/dropup.svg";
import "./layoutStyles/Header.css";

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
        <NavLink to="/">
          <p className="link-label">Главная</p>
        </NavLink>
        <DropDownLinks label="Менеджер">
          <NavLink to="/buses">
            <p>Автобусы</p>
          </NavLink>
          <NavLink to="/employees">
            <p>Сотрудники</p>
          </NavLink>
          <NavLink to="/routes">
            <p>Маршруты</p>
          </NavLink>
          <NavLink to="/schedule">
            <p>Расписание</p>
          </NavLink>
        </DropDownLinks>
        <DropDownLinks label="Дирекция">
          <NavLink to="/successful">
            <p>Успешные</p>
          </NavLink>
          <NavLink to="/canceled">
            <p>Отмененные</p>
          </NavLink>
          <NavLink to="/profit">
            <p>Прибыль</p>
          </NavLink>
        </DropDownLinks>
        <DropDownLinks label="Кассир">
          <NavLink to="/tickets">
            <p>Билеты</p>
          </NavLink>
        </DropDownLinks>
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

const DropDownLinks = ({ children, label }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="dropdown__container">
      <label
        className="link-label dropdown-label"
        onClick={showDropdownHandler}
      >
        {label}
        <img src={showDropdown ? dropup : dropdown} className="dropdown-img" />
      </label>
      {showDropdown && (
        <div className="dropdown" onClick={showDropdownHandler}>
          {children}
        </div>
      )}
    </div>
  );
};
