import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";
import { translateBusStatus } from "../../../extraFunctions/ExtraFunctions";

import "./busesStyles/BusItem.css";

const BusItem = ({ data, deleteHandler, updateHandler }) => {
  // РАБОТА С ДОПОЛЬНИТЕЛЬНОЙ ИНФОРМАЦИЕЙ
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  let driverName = " не назначен";
  if (data.driver) {
    let firstName = data.driver.first_name;
    let lastName = data.driver.last_name;
    let fatherName = data.driver.father_name ? data.driver.father_name : "";
    driverName = [lastName, firstName, fatherName].join(" ");
  }

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p className="bus-code"> Автобус №{data.code}</p>
        <p className="bus-status">статус — {translateBusStatus(data.status)}</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          <div className="bus-info__container">
            <p className="bus-driver-label">ФИО водителя:</p>
            <p className="bus-driver-info">{driverName}</p>
          </div>
          <div className="bus-info__container">
            <p className="bus-model-label">Модель автобуса:</p>
            <p className="bus-model-info">
              {" " + data.model} — {data.numberOfSits} мест.
            </p>
          </div>
        </ul>
      )}
    </>
  );
};

export default BusItem;
