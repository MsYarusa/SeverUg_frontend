import "./objectStyles/Window.css";
import "../pages/schedule/scheduleStyles/AddUpdateTrip.css";

const AddUpdateObject = ({
  children,
  cancelHandler,
  submitHandler,
  errorMessage,
  noErrors,
}) => {
  return (
    <div className="window__container">
      <form className="window" onSubmit={submitHandler}>
        <div className="window__inner">{children}</div>
        <p className={noErrors ? "error error-disabled" : "error"}>
          {errorMessage()}
        </p>
        <div id="buttons">
          <button id="cancel" type="button" onClick={cancelHandler}>
            Отмена
          </button>
          <button type="submit">Подтвердить</button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateObject;
