import ObjectsList from "../../cards/ObjectsList";
import StationItem from "./StationItem";
import SearchByName from "../../cards/ObjectSearchByName";
import LinkButton from "../../cards/LinkButton";
import "../../cards/ObjectSearch.css";
import "./StationsList.css";

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
          <LinkButton to="/routes" style={{ textDecoration: "none" }}>
            <p>Вернуться к маршрутам</p>
          </LinkButton>
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
