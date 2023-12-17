import React, { useState } from "react";

import ObjectsList from "../../cards/ObjectsList";
import SearchFromTo from "../../cards/ObjectSearchFromTo";
import ScheduleItem from "../schedule/ScheduleItem";
import DepartureItem from "./DepartureItem";
import DeparturesFilter from "../routes/RouteFilterBeta";
import filter from "../../cards/buttonImgs/filter.svg";
import "../../cards/objectStyles/ObjectSearch.css";
import "./ticketStyles/DeparturesList.css";

const DeparturesList = ({
  searchHandler,
  filterHandler,
  changeState,
  buyHandler,
  list,
}) => {
  // хранение актуальное состояния
  const [dateSelected, setDateSelected] = useState(null);
  // изменение состояния
  const selectDateHandler = (event) => {
    let date = event.target.value === "" ? null : new Date(event.target.value);
    changeState(date);
    setDateSelected(date);
  };
  // хранение состояния фильтра
  const [showFilter, setShowFilter] = useState(false);
  // изменение видимости фильтра
  const showFilterHandler = () => {
    setShowFilter(!showFilter);
  };
  return (
    <ObjectsList list={list}>
      <div className="object-search">
        <div className="departures-date__container">
          <input
            type="date"
            id={"date-selector"}
            onChange={selectDateHandler}
          />
        </div>
        <SearchFromTo search={searchHandler} />
        <button onClick={showFilterHandler} className="show-filter-button">
          <img src={filter} />
        </button>
      </div>
      <DeparturesFilter
        onFilter={filterHandler}
        isSmall={true}
        isVisible={showFilter}
      />
      {list?.map((item) => (
        <div
          key={item.id + " " + (item.trip ? item.trip.id : "")}
          className="items__container"
        >
          {dateSelected ? (
            <>{item.trip && <DepartureItem data={item} onBuy={buyHandler} />}</>
          ) : (
            <>{!item.trip && <ScheduleItem data={item} />}</>
          )}
        </div>
      ))}
    </ObjectsList>
  );
};

export default DeparturesList;
