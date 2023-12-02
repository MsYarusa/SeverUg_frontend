import "./objectStyles/ObjectFilter.css";

const ObjectFilter = ({ children }) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler} className="object-filter">
      {children}
    </form>
  );
};

export default ObjectFilter;
