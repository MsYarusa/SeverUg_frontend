import "./objectStyles/ObjectsList.css";

const ObjectsList = ({ children, list }) => {
  return (
    <div className="objects-list">
      <ul>{children}</ul>
      {list?.length === 0 && <p id="message">Ничего не найдено</p>}
    </div>
  );
};

export default ObjectsList;
