import React from "react";
import ObjectsList from "../cards/ObjectsList";
import ScheduleSearch from "./ScheduleSearch";
import ScheduleItem from "./ScheduleItem";
import "../cards/ObjectSearch.css";

const ScheduleList = ({ searchHandler, addScheduleHandler, list }) => {
  return (
    <ObjectsList>
      <ul>
        <div className="object-search">
          <ScheduleSearch search={searchHandler} />
          <button onClick={addScheduleHandler}>Добавить рейс</button>
        </div>
        {list?.map((item) => (
          <ScheduleItem key={item.trip_id} data={item} />
        ))}
      </ul>
      {list.length === 0 && <p id="message">Нет совпадений</p>}
    </ObjectsList>
  );
};

export default ScheduleList;
