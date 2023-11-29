import React from "react";
import ObjectsList from "../../cards/ObjectsList";
import SearchFromTo from "../../cards/ObjectSearchFromTo";
import ScheduleItem from "./ScheduleItem";
import "../../cards/ObjectSearch.css";

const ScheduleList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <ObjectsList>
      <div className="object-search">
        <SearchFromTo search={searchHandler} />
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
    </ObjectsList>
  );
};

export default ScheduleList;
