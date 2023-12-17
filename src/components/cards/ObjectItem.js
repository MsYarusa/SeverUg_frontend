import deleteImg from "./buttonImgs/delete.svg";
import updateImg from "./buttonImgs/update.svg";
import "./objectStyles/ObjectItem.css";

const ObjectItem = ({
  children,
  updateHandler,
  deleteHandler,
  onClick,
  id,
}) => {
  const updateClickedHandler = (event) => {
    event.stopPropagation();
    let [type, id] = event.target.id.split(" ");
    updateHandler(Number(id));
  };

  const deleteClickedHandler = (event) => {
    event.stopPropagation();

    let [type, id] = event.target.id.split(" ");
    deleteHandler(Number(id));
  };

  return (
    <div className="object-item" onClick={onClick}>
      {children}
      <div id="buttons">
        {updateHandler && (
          <button id={"upd " + id} onClick={updateClickedHandler}>
            <img src={updateImg} id={"upd " + id} />
          </button>
        )}
        {deleteHandler && (
          <button id={"del " + id} onClick={deleteClickedHandler}>
            <img src={deleteImg} id={"del " + id} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ObjectItem;
