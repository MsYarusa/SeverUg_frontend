import ObjectList from "../../cards/ObjectsList";
import SearchByName from "../../cards/ObjectSearchByName";
import BusItem from "./BusItem";

import "../../cards/objectStyles/ObjectSearch.css";

const BusesList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <ObjectList list={list}>
      <div className="object-search">
        <SearchByName
          search={searchHandler}
          placeholder="Номер автобуса или ФИО водителя"
        />
        <button onClick={buttonsHandlers.add}>Добавить автобус</button>
      </div>
      {list?.map((item) => (
        <BusItem
          key={item.id}
          data={item}
          deleteHandler={buttonsHandlers.delete}
          updateHandler={buttonsHandlers.update}
        />
      ))}
    </ObjectList>
  );
};

export default BusesList;
