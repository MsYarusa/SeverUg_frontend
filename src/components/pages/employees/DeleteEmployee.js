import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../../store/requests/EmployeesRequests";

import DeleteObject from "../../cards/AddUpdateDeleteObjects";

import "../../cards/objectStyles/Window.css";

const DeleteEmployee = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  // подтверждение удаления
  const confirmHaldler = (event) => {
    event.preventDefault();
    // отправка запроса на удаление
    dispatch(deleteEmployee({ id: id }));
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
      <p>Подтвердите удаление данных сотрудника</p>
    </DeleteObject>
  );
};

export default DeleteEmployee;
