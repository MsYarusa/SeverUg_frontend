import { useDispatch } from "react-redux";
import { deleteTrip } from "../../../store/requests/ScheduleRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";

const DeleteTrip = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  // подтверждение удаления
  const confirmHaldler = (event) => {
    event.preventDefault();
    // отправка запроса на удаление
    dispatch(deleteTrip({ id: id }));
    // закрытие окна
    cancelHandler();
  };

  return (
    <DeleteObject
      cancelHandler={cancelHandler}
      submitHandler={confirmHaldler}
      errorMessage={() => {}}
      noErrors={true}
    >
      <p>Подтвердите удаление рейса</p>
    </DeleteObject>
  );
};

export default DeleteTrip;
