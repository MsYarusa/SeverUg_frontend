import React from "react";
import "./ObjectItem.css";
import deleteImg from "./buttonImgs/delete.svg";
import updateImg from "./buttonImgs/update.svg";

const ObjectItem = ({ children, updateHandler, deleteHandler, onClick }) => {
  const updateClickedHandler = (event) => {
    event.stopPropagation();
    updateHandler();
  };

  const deleteClickedHandler = (event) => {
    event.stopPropagation();
    deleteHandler();
  };

  return (
    <div className="object-item" onClick={onClick}>
      {children}
      <div id="buttons">
        <button id="update" onClick={updateClickedHandler}>
          <img src={updateImg} />
        </button>
        <button id="delete" onClick={deleteClickedHandler}>
          <img src={deleteImg} />
        </button>
      </div>
    </div>
  );
};

export default ObjectItem;
