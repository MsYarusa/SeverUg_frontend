import React, { useState, useEffect } from "react";
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

  let NavLinks = null;

  switch (user.role) {
    case "admin":
      NavLinks = AdminNavLinks;
      break;
    case "manager":
      NavLinks = ManagerNavLinks;
      break;
    case "director":
      NavLinks = DirectorNavLinks;
      break;
    case "cashier":
      NavLinks = CashierNavLinks;
      break;
  }

  const clickHandler = () => {
    setUserInfoOpen(!userInfoOpen);
  };

  return (
    <>
      <header className="header">
        <Logo />
        <NavLinks />
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

const AdminNavLinks = () => {
  return (
    <>
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
        <NavLink to="/canceled">
          <p>Отмененные</p>
        </NavLink>
        <NavLink to="/profit">
          <p>Прибыль</p>
        </NavLink>
        <NavLink to="/successful">
          <p>Успешные</p>
        </NavLink>
      </DropDownLinks>
      <DropDownLinks label="Кассир">
        <NavLink to="/tickets">
          <p>Билеты</p>
        </NavLink>
      </DropDownLinks>
    </>
  );
};

const ManagerNavLinks = () => {
  return (
    <>
      <NavLink to="/">
        <p className="link-label">Главная</p>
      </NavLink>
      <NavLink to="/buses">
        <p className="link-label">Автобусы</p>
      </NavLink>
      <NavLink to="/employees">
        <p className="link-label">Сотрудники</p>
      </NavLink>
      <NavLink to="/routes">
        <p className="link-label">Маршруты</p>
      </NavLink>
      <NavLink to="/schedule">
        <p className="link-label">Расписание</p>
      </NavLink>
    </>
  );
};

const DirectorNavLinks = () => {
  return (
    <>
      <NavLink to="/">
        <p className="link-label">Главная</p>
      </NavLink>
      <NavLink to="/canceled">
        <p className="link-label">Отмененные</p>
      </NavLink>
      <NavLink to="/profit">
        <p className="link-label">Прибыль</p>
      </NavLink>
      <NavLink to="/successful">
        <p className="link-label">Успешные</p>
      </NavLink>
    </>
  );
};

const CashierNavLinks = () => {
  return <></>;
};

const DropDownLinks = ({ children, label }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    console.log("effect");
    const dropdownDiv = document.getElementById("dropdown__container-" + label);
    document.addEventListener("click", (e) => {
      const withinBoundaries = e.composedPath().includes(dropdownDiv);
      // console.log("clicked");

      if (!withinBoundaries) {
        setShowDropdown(false);
      } else {
        setShowDropdown(!showDropdown);
      }
    });
  }, []);

  return (
    <div className="dropdown__container" id={"dropdown__container-" + label}>
      <label className="link-label dropdown-label">
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
