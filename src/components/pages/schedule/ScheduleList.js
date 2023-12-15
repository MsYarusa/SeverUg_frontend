import React, { useState } from "react";
import ObjectsList from "../../cards/ObjectsList";
import SearchFromTo from "../../cards/ObjectSearchFromTo";
import ScheduleItem from "./ScheduleItem";

import ScheduleFilter from "./ScheduleFilterBeta";
import filter from "../../cards/buttonImgs/filter.svg";
import "../../cards/objectStyles/ObjectSearch.css";

const ScheduleList = ({ searchHandler, list, buttonsHandlers, onFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const showFilterHandler = () => {
    setShowFilter(!showFilter);
  };
  return (
    <ObjectsList list={list}>
      <div className="object-search">
        <SearchFromTo search={searchHandler} />
        <button onClick={showFilterHandler} className="show-filter-button">
          <img src={filter} />
        </button>
        <button onClick={buttonsHandlers.add}>Добавить рейс</button>
      </div>
      <ScheduleFilter
        onFilter={onFilter}
        isSmall={true}
        isVisible={showFilter}
      />
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
