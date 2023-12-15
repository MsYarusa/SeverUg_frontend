import React, { useState } from "react";
import { Link } from "react-router-dom";

import ObjectsList from "../../cards/ObjectsList";
import SearchFromTo from "../../cards/ObjectSearchFromTo";
import RouteItem from "./RouteItem";

import RouteFilter from "./RouteFilterBeta";
import filter from "../../cards/buttonImgs/filter.svg";
import "../../cards/objectStyles/ObjectSearch.css";

const RoutesList = ({ searchHandler, list, buttonsHandlers, onFilter }) => {
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
        <button onClick={buttonsHandlers.add}>Добавить маршрут</button>
        <Link to="/stations" style={{ textDecoration: "none" }}>
          <p>Список станций</p>
        </Link>
      </div>
      <RouteFilter onFilter={onFilter} isSmall={true} isVisible={showFilter} />
      {list?.map((item) => (
        <RouteItem
          key={item.id}
          data={item}
          deleteHandler={buttonsHandlers.delete}
          updateHandler={buttonsHandlers.update}
        />
      ))}
    </ObjectsList>
  );
};

export default RoutesList;
