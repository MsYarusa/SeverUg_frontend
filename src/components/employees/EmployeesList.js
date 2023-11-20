import ObjectsList from "../cards/ObjectsList";
import ObjectSearch from "../cards/ObjectSearch";
import Employee from "./Employee";
import "../cards/ObjectSearch.css";

const EmployeesList = ({ searchHandler, addEmployeeHandler, list }) => {
  return (
    <ObjectsList>
      <ul>
        <div className="object-search">
          <ObjectSearch
            search={searchHandler}
            searchMessage={"Найти сотрудника"}
          />
          <button onClick={addEmployeeHandler}>
            Зарегистрировать сотрудника
          </button>
        </div>
        {list?.map((item) => (
          <Employee key={item.id} data={item} />
        ))}
      </ul>
      {list.length === 0 && <p id="message">Нет совпадений</p>}
    </ObjectsList>
  );
};

export default EmployeesList;
