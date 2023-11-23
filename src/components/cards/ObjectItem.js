import React from "react";
import "./ObjectItem.css";
import deleteImg from "./buttonImgs/delete.svg";
import updateImg from "./buttonImgs/update.svg";

const ObjectItem = ({
  children,
  updateHandler,
  deleteHandler,
  onClick,
  id,
}) => {
  const updateClickedHandler = (event) => {
    event.stopPropagation();
    let [type, id] = event.target.id.split(" ");
    updateHandler(Number(id));
  };

  const deleteClickedHandler = (event) => {
    event.stopPropagation();

    let [type, id] = event.target.id.split(" ");
    deleteHandler(Number(id));
  };

  return (
    <div className="object-item" onClick={onClick}>
      {children}
      <div id="buttons">
        <button id={"upd " + id.toString()} onClick={updateClickedHandler}>
          <img src={updateImg} id={"upd " + id.toString()} />
        </button>
        <button id={"del " + id.toString()} onClick={deleteClickedHandler}>
          <img src={deleteImg} id={"del " + id.toString()} />
        </button>
      </div>
    </div>
  );
};

export default ObjectItem;
