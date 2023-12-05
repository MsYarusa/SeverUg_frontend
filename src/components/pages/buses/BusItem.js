import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";

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
        <p className="bus-status">статус — {data.status}</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          <div className="bus-info__container">
            <p className="bus-driver">ФИО водителя: {driverName}</p>
          </div>
          <div className="bus-info__container">
            <p className="bus-model">
              Модель автобуса:
              {" " + data.model} — {data.numberOfSits} мест.
            </p>
          </div>
        </ul>
      )}
    </>
  );
};

export default BusItem;
