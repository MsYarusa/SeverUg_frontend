import React from "react";
import { useDispatch } from "react-redux";
import { deleteRoute } from "../../../requests/RoutesRequests";
import "../../cards/Window.css";

const DeleteRoute = ({ cancelHandler, id }) => {
  const dispatch = useDispatch();

  const confirmHaldler = () => {
    dispatch(deleteRoute({ id: id }));
    cancelHandler();
  };

  return (
    <div className="window__container">
      <div className="window">
        <p>Подтвердите удаление маршрута</p>
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

export default DeleteRoute;
