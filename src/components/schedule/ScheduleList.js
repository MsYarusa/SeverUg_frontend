import React from "react";
import ObjectsList from "../cards/ObjectsList";
import ScheduleSearch from "./ScheduleSearch";
import ScheduleItem from "./ScheduleItem";
import "../cards/ObjectSearch.css";

const ScheduleList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <ObjectsList>
      <ul>
        <div className="object-search">
          <ScheduleSearch search={searchHandler} />
          <button onClick={buttonsHandlers.add}>Добавить рейс</button>
        </div>
        {list?.map((item) => (
          <ScheduleItem
            key={item.id}
            data={item}
            deleteHandler={buttonsHandlers.delete}
            updateHandler={buttonsHandlers.update}
          />
        ))}
      </ul>
      {list.length === 0 && <p id="message">Нет совпадений</p>}
    </ObjectsList>
  );
};

export default ScheduleList;
