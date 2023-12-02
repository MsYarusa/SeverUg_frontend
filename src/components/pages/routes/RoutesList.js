import ObjectsList from "../../cards/ObjectsList";
import SearchFromTo from "../../cards/ObjectSearchFromTo";
import RouteItem from "./RouteItem";
import { Link } from "react-router-dom";
import "../../cards/objectStyles/ObjectSearch.css";

const RoutesList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <ObjectsList list={list}>
      <div className="object-search">
        <SearchFromTo search={searchHandler} />
        <button onClick={buttonsHandlers.add}>Добавить маршрут</button>
        <Link to="/stations" style={{ textDecoration: "none" }}>
          <p>Список станций</p>
        </Link>
      </div>
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
