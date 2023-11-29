import ObjectItem from "../../cards/ObjectItem";
import "./StationItem.css";

const StationItem = ({ data, deleteHandler, updateHandler }) => {
  return (
    <div className="station-item__container">
      <ObjectItem
        deleteHandler={deleteHandler}
        updateHandler={updateHandler}
        id={data.id}
      >
        <p className="station-name">{data.name}</p>
      </ObjectItem>
    </div>
  );
};

export default StationItem;
