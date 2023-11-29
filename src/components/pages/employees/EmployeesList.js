import List from "../../cards/ObjectsList";
import Search from "../../cards/ObjectSearchByName";
import Employee from "./Employee";
import "../../cards/ObjectSearch.css";

const EmployeesList = ({ searchHandler, addEmployeeHandler, list }) => {
  return (
    <List>
      <div className="object-search">
        <Search search={searchHandler} searchMessage={"Найти сотрудника"} />
        <button onClick={addEmployeeHandler}>
          Зарегистрировать сотрудника
        </button>
      </div>
      {list?.map((item) => (
        <Employee key={item.id} data={item} />
      ))}
    </List>
  );
};

export default EmployeesList;
