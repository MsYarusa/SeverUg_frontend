import { useDispatch } from "react-redux";
import { deleteBus } from "../../../store/requests/BusesRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";

const DeleteBus = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  // подтверждение удаления
  const confirmHaldler = (event) => {
    event.preventDefault();
    // отправка запроса на удаление
    dispatch(deleteBus({ id: id }));
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
      <p>Подтвердите удаление данных автобуса</p>
    </DeleteObject>
  );
};

export default DeleteBus;
