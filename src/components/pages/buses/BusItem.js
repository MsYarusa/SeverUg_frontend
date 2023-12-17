import React, { useState } from "react";
import { useSelector } from "react-redux";
import ObjectItem from "../../cards/ObjectItem";
import { translateBusStatus } from "../../../extraFunctions/Translators";

import wheel from "./busesImg/wheel.svg";
import "./busesStyles/BusItem.css";

const BusItem = ({ data, deleteHandler, updateHandler, driverHandler }) => {
  const drivers = useSelector((state) => state.employees.drivers);
  // РАБОТА С ДОПОЛЬНИТЕЛЬНОЙ ИНФОРМАЦИЕЙ
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  let driverName = " не назначен";
  if (data.drive_id) {
    let driver = drivers.find((driver) => driver.id === data.drive_id);
    let firstName = driver.first_name;
    let lastName = driver.last_name;
    let fatherName = driver.father_name ? driver.father_name : "";
    driverName = [lastName, firstName, fatherName].join(" ");
  }

  const driverClickedHandler = (event) => {
    event.stopPropagation();

    let [type, id] = event.target.id.split(" ");
    driverHandler(Number(id));
  };

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p className="bus-code"> Автобус № {data.code}</p>
        <p className="bus-status">статус — {translateBusStatus(data.status)}</p>
        <button id={"dri " + data.id} onClick={driverClickedHandler}>
          <img src={wheel} id={"dri " + data.id} />
        </button>
      </ObjectItem>
      {info && (
        <ul className="info">
          <div className="bus-info__container">
            <p className="bus-info-label">ФИО водителя:</p>
            <p className="bus-info">{driverName}</p>
          </div>
          <div className="bus-info__container">
            <p className="bus-info-label">Модель автобуса:</p>
            <p className="bus-info">
              {" " + data.model} — {data.number_of_sits} мест.
            </p>
          </div>
        </ul>
      )}
    </>
  );
};

export default BusItem;
