import { useDispatch } from "react-redux";
import { deleteTrip } from "../../../requests/ScheduleRequests";
import "../../cards/objectStyles/Window.css";

const DeleteTrip = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  const confirmHaldler = () => {
    dispatch(deleteTrip({ id: id }));
    cancelHandler();
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
