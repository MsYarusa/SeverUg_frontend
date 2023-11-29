import { useDispatch } from "react-redux";
import { deleteTrip } from "../../../requests/SheduleRequests";
import "../../cards/Window.css";

const DeleteTrip = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  const confirmHaldler = () => {
    dispatch(deleteTrip({ id: id }));
  };

  return (
    <div className="window__container">
      <div className="window">
        <p>Подтвердите удаление рейса</p>
        <div id="buttons">
          <button id="cancel" onClick={cancelHandler}>
            Отмена
          </button>
          <button id="confirmation" onClick={confirmHaldler}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrip;
