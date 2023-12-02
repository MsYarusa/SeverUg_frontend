import ObjectsList from "../../cards/ObjectsList";
import StationItem from "./StationItem";
import SearchByName from "../../cards/ObjectSearchByName";
import { Link } from "react-router-dom";

import "../../cards/objectStyles/ObjectSearch.css";
import "./stationStyles/StationsList.css";

const StationsList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <div className="station-list__container">
      <ObjectsList list={list}>
        <div className="object-search">
          <SearchByName
            search={searchHandler}
            placeholder={"Название станции"}
          />
          <button onClick={buttonsHandlers.add}>Добавить станцию</button>
          <Link to={-1} style={{ textDecoration: "none" }}>
            <p>Вернуться к маршрутам</p>
          </Link>
        </div>
        <ul className="stations-grid">
          {list?.map((item) => (
            <StationItem
              key={item.id}
              data={item}
              deleteHandler={buttonsHandlers.delete}
              updateHandler={buttonsHandlers.update}
            />
          ))}
        </ul>
      </ObjectsList>
    </div>
  );
};

export default StationsList;
