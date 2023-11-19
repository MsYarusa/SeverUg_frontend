import React from "react";
import "./ObjectItem.css";
import deleteImg from "./buttonImgs/delete.svg";
import updateImg from "./buttonImgs/update.svg";

const ObjectItem = ({ children, updateHandler, deleteHandler }) => {
  return (
    <div className="object-item">
      {children}
      <div id="buttons">
        <button id="update" onClick={updateHandler}>
          <img src={updateImg} />
        </button>
        <button id="delete" onClick={deleteHandler}>
          <img src={deleteImg} />
        </button>
      </div>
    </div>
  );
};

export default ObjectItem;
