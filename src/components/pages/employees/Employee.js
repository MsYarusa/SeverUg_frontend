import React, { useState } from "react";
import ObjectItem from "../../cards/ObjectItem";

import "./employeesStyles/Employee.css";

const Employee = ({ data, deleteHandler, updateHandler }) => {
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
        <p className="employee-role">{data.role}</p>
      </ObjectItem>
      {info && (
        <ul className="info">
          <div className="employee-info__container">
            <p className="employee-email">email: {data.email}</p>
          </div>
        </ul>
      )}
    </>
  );
};

export default Employee;
