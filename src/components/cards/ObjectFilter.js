import "./objectStyles/ObjectFilter.css";

const ObjectFilter = ({ children, clearHandler }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler} className="object-filter">
      {children}
      <button id="clear" type="reset" onClick={clearHandler}>
        Сбросить
      </button>
    </form>
  );
};

export default ObjectFilter;
