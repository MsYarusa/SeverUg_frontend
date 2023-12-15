import "./objectStyles/ObjectFilter.css";
import "./objectStyles/ObjectFilterSmall.css";

const ObjectFilterSmall = ({ children, clearHandler, isVisible }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="object-filter__small__container">
      <form
        onSubmit={submitHandler}
        className={
          isVisible ? "object-filter__small" : "object-filter__small-hide"
        }
      >
        {children}
        <button id="clear" type="reset" onClick={clearHandler}>
          Сбросить
        </button>
      </form>
    </div>
  );
};

export default ObjectFilterSmall;
