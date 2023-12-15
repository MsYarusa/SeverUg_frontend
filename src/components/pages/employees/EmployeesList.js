import { useState } from "react";
import ObjectList from "../../cards/ObjectsList";
import SearchByName from "../../cards/ObjectSearchByName";
import Employee from "./Employee";
import EmployeeFilterSmall from "./EmployeeFilters/EmployeeFilterSmall";
import EmployeeFilter from "./EmployeeFilters/EmployeeFilter";

import "../../cards/objectStyles/ObjectSearch.css";

const EmployeesList = ({ searchHandler, list, buttonsHandlers, onFilter }) => {
  const [showFilter, setShowFilter] = useState(false);
  const showFilterHandler = () => {
    setShowFilter(!showFilter);
  };

  return (
    <ObjectList list={list}>
      <div className="object-search">
        <SearchByName search={searchHandler} placeholder="ФИО сотрудника" />
        <button onClick={showFilterHandler} className="show-filter-button">
          Фильтр
        </button>
        <button onClick={buttonsHandlers.add}>
          Зарегистрировать сотрудника
        </button>
      </div>
      <EmployeeFilter
        onFilter={onFilter}
        isVisible={showFilter}
        isSmall={true}
      />
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
