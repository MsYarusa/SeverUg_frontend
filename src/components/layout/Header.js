import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { translateRole } from "../../extraFunctions/ExtraFunctions";
import { removeUser } from "../../store/slicies/userSlice";

import Logo from "./Logo";

import userImg from "./layoutImgs/userImg.svg";
import logOut from "./layoutImgs/LogOut.svg";
import dropdown from "./layoutImgs/dropdown.svg";
import dropup from "./layoutImgs/dropup.svg";
import burgerMenu from "./layoutImgs/burgerMenu.svg";
import "./layoutStyles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  let NavLinks = null;
  let BurgerLinks = null;

  switch (user.role) {
    case "admin":
      NavLinks = AdminNavLinks;
      BurgerLinks = AdminNavLinksPlain;
      break;
    case "manager":
      NavLinks = ManagerNavLinks;
      BurgerLinks = NavLinks;
      break;
    case "director":
      NavLinks = DirectorNavLinks;
      BurgerLinks = NavLinks;
      break;
    case "cashier":
      NavLinks = CashierNavLinks;
      break;
  }

  const logOutHandler = () => {
    dispatch(removeUser());
  };

  return (
    <>
      <header className="header">
        <Logo />
        <div className="nav-bar">
          <NavLinks />
        </div>
        <div className="user__container">
          <div id="user">
            <DropdownObject
              label={[user.last_name, user.first_name].join(" ")}
              style="dropdown-user"
              isLinks={false}
              extraIcon={userImg}
            >
              <div>
                <p style={{ textDecoration: "underline" }}>Фамилия:</p>
                <p>{user.last_name}</p>
              </div>
              <div>
                <p style={{ textDecoration: "underline" }}>Имя:</p>
                <p>{user.first_name}</p>
              </div>
              <div>
                <p style={{ textDecoration: "underline" }}>Отчество:</p>
                <p>{user.father_name ? user.father_name : "не указано"}</p>
              </div>
              <div>
                <p style={{ textDecoration: "underline" }}>Должность:</p>
                <p>{translateRole(user.role)}</p>
              </div>
              <div>
                <p style={{ textDecoration: "underline" }}>Телефон:</p>
                <p>{user.phone_number ? user.phone_number : "не указан"}</p>
              </div>
              <div>
                <p style={{ textDecoration: "underline" }}>Почта:</p>
                <p>{user.email ? user.email : "не указана"}</p>
              </div>
              <button onClick={logOutHandler}>
                <img src={logOut} alt="user" />
                <p>Выйти из аккаунта</p>
              </button>
            </DropdownObject>
          </div>{" "}
          {BurgerLinks && (
            <BurgerMenu>
              <BurgerLinks />
            </BurgerMenu>
          )}
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
      <DropdownObject label="Менеджер" style="dropdown" isLinks={true}>
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
      </DropdownObject>
      <DropdownObject label="Дирекция" style="dropdown" isLinks={true}>
        <NavLink to="/canceled">
          <p>Отмененные</p>
        </NavLink>
        <NavLink to="/profit">
          <p>Прибыль</p>
        </NavLink>
        <NavLink to="/successful">
          <p>Успешные</p>
        </NavLink>
      </DropdownObject>
      <DropdownObject label="Кассир" style="dropdown" isLinks={true}>
        <NavLink to="/tickets">
          <p>Билеты</p>
        </NavLink>
      </DropdownObject>
    </>
  );
};

const AdminNavLinksPlain = () => {
  return (
    <>
      <NavLink to="/">
        <p className="link-label">Главная</p>
      </NavLink>
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
      <NavLink to="/canceled">
        <p>Отмененные</p>
      </NavLink>
      <NavLink to="/profit">
        <p>Прибыль</p>
      </NavLink>
      <NavLink to="/successful">
        <p>Успешные</p>
      </NavLink>
      <NavLink to="/tickets">
        <p>Билеты</p>
      </NavLink>
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

const BurgerMenu = ({ children }) => {
  return (
    <div id="burger-menu__container">
      <DropdownObject
        label={"burger"}
        style={"dropdown"}
        isLinks={true}
        extraIcon={burgerMenu}
      >
        {children}
      </DropdownObject>
    </div>
  );
};

const DropdownObject = ({ children, label, style, isLinks, extraIcon }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = (event) => {
    const dropdownDiv = document.getElementById("dropdown__container-" + label);
    const dropdownIsVisible = document.getElementById("dropdown-" + label);
    const withinBoundaries = event.composedPath().includes(dropdownDiv);

    if (!withinBoundaries || (dropdownIsVisible && isLinks)) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", showDropdownHandler);
    return () => {
      document.removeEventListener("click", showDropdownHandler);
    };
  }, []);

  return (
    <div className="dropdown__container" id={"dropdown__container-" + label}>
      <label className="link-label dropdown-label">
        {extraIcon && <img src={extraIcon} className="extra-icon" />}
        <p>{label}</p>
        {!extraIcon && (
          <img
            src={showDropdown ? dropup : dropdown}
            className="dropdown-img"
          />
        )}
      </label>
      {showDropdown && (
        <div id={"dropdown-" + label} className={style}>
          {children}
        </div>
      )}
    </div>
  );
};
