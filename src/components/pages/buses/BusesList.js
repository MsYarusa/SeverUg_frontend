import { useState } from "react";
import { useSelector } from "react-redux";

import ObjectList from "../../cards/ObjectsList";
import SearchByName from "../../cards/ObjectSearchByName";
import BusItem from "./BusItem";
import AddDriver from "./AddDriver";
import BusesFilter from "./BusFilterBeta";
import filter from "../../cards/buttonImgs/filter.svg";
import "../../cards/objectStyles/ObjectSearch.css";

const BusesList = ({ searchHandler, list, buttonsHandlers, onFilter }) => {
  const [addDriver, setAddDriver] = useState(false);
  const [addDriverToID, setAddDriverToID] = useState(null);

  const buses = useSelector((state) => state.buses.buses);

  const driverHandler = (id) => {
    let data = buses.find((bus) => bus.id === id);
    setAddDriver(true);
    setAddDriverToID(data);
  };

  const cancelHandler = () => {
    setAddDriver(false);
  };

  const [showFilter, setShowFilter] = useState(false);
  const showFilterHandler = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <ObjectList list={list}>
        <div className="object-search">
          <SearchByName
            search={searchHandler}
            placeholder="Номер автобуса или ФИО водителя"
          />
          <button onClick={showFilterHandler} className="show-filter-button">
            <img src={filter} />
          </button>
          <button onClick={buttonsHandlers.add}>Добавить автобус</button>
        </div>
        <BusesFilter
          onFilter={onFilter}
          isSmall={true}
          isVisible={showFilter}
        />
        {list?.map((item) => (
          <BusItem
            key={item.id}
            data={item}
            deleteHandler={buttonsHandlers.delete}
            updateHandler={buttonsHandlers.update}
            driverHandler={driverHandler}
          />
        ))}
      </ObjectList>
      {addDriver && (
        <AddDriver data={addDriverToID} cancelHandler={cancelHandler} />
      )}
    </>
  );
};

export default BusesList;
