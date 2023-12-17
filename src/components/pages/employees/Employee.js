import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { translateRole } from "../../../extraFunctions/Translators";

import ObjectItem from "../../cards/ObjectItem";

import "./employeesStyles/Employee.css";

const Employee = ({ data, deleteHandler, updateHandler }) => {
  const buses = useSelector((state) => state.buses.buses);
  const [bus, setBus] = useState(null);

  useEffect(() => {
    let bus = buses.find((bus) => bus.drive_id === data.id);
    if (bus) {
      setBus(bus);
    }
  }, [buses]);

  // РАБОТА С ДОПОЛЬНИТЕЛЬНОЙ ИНФОРМАЦИЕЙ
  const [info, setInfo] = useState();

  const infoHandler = () => {
    setInfo(!info);
  };

  return (
    <>
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        onClick={infoHandler}
        id={data.id}
      >
        <p className="employee-name">
          {data.last_name} {data.first_name} {data.father_name}
        </p>
        <p className="employee-role">{translateRole(data.role)}</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          <div className="employee-info__container">
            <p className="employee-info-label">email:</p>
            <p className="employee-info">
              {data.email ? data.email : "не указан"}
            </p>
          </div>
          <div className="employee-info__container">
            <p className="employee-info-label">мобильный номер:</p>
            <p className="employee-info">
              {data.phone_number ? data.phone_number : "не указан"}
            </p>
          </div>
          {data.role === "driver" && (
            <>
              <div className="employee-info__container">
                <p className="employee-info-label">
                  водительское удостоверение (серия и номер):
                </p>
                <p className="employee-info">
                  {data.driver_id ? data.driver_id : "не указан"}
                </p>
              </div>
              <div className="employee-info__container">
                <p className="employee-info-label"> закрепленный автобус:</p>
                <p className="employee-info">
                  {bus ? "№ " + bus.code : "не назначен"}
                </p>
              </div>
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default Employee;
