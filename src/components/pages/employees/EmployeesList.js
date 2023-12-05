import ObjectList from "../../cards/ObjectsList";
import SearchByName from "../../cards/ObjectSearchByName";
import Employee from "./Employee";

import "../../cards/objectStyles/ObjectSearch.css";

const EmployeesList = ({ searchHandler, list, buttonsHandlers }) => {
  return (
    <ObjectList>
      <div className="object-search">
        <SearchByName search={searchHandler} placeholder="Найти сотрудника" />
        <button onClick={buttonsHandlers.add}>
          Зарегистрировать сотрудника
        </button>
      </div>
      {list?.map((item) => (
        <Employee
          key={item.id}
          data={item}
          deleteHandler={buttonsHandlers.delete}
          updateHandler={buttonsHandlers.update}
        />
      ))}
    </ObjectList>
  );
};

export default EmployeesList;
