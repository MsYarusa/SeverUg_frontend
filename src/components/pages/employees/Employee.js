import React from "react";
import ObjectItem from "../../cards/ObjectItem";
import "./Employee.css";

const Employee = ({ data }) => {
  const printDelete = () => {
    console.log("delete");
  };
  const printUpdate = () => {
    console.log("update");
  };

  return (
    <ObjectItem
      deleteHandler={printDelete}
      updateHandler={printUpdate}
      id={data.id}
    >
      <p id="name">
        {data.last_name} {data.first_name}
      </p>
      <p id="role">{data.role}</p>
    </ObjectItem>
  );
};

export default Employee;
