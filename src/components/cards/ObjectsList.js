import React from "react";
import "./ObjectsList.css";

const ObjectsList = ({ children, list }) => {
  return (
    <div className="objects-list">
      <ul>{children}</ul>
      {list?.length === 0 && <p id="message">Нет совпадений</p>}
    </div>
  );
};

export default ObjectsList;
