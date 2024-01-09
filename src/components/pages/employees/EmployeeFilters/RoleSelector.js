import { translateRole } from "../../../../extraFunctions/TranslateFunctions";
import { rolesEN } from "../../../../extraFunctions/CONSTs/TranslatorCONSTS";

import cancelImg from "../../../cards/buttonImgs/close.svg";

const RoleSelectList = ({
  filterHandler,
  extraRoles,
  setExtraRoles,
  filterConfig,
  setFilterConfig,
  defaultValue,
  isSmall,
  onFilter,
}) => {
  const primeType = isSmall ? "role-select-small " : "role-select ";
  // ВЫБОР РОЛИ
  // добавление роли
  const addRoleHandler = () => {
    setExtraRoles([...extraRoles, extraRoles.length + 1]);
  };

  //удаление роли
  const deleteRoleHandler = (event) => {
    //сохраняем все роли кроме удаленной
    let rolesForSave =
      event.target.id !== "0"
        ? [document.getElementById(primeType + 0).value]
        : [];
    for (let index of extraRoles) {
      if (event.target.id !== index.toString()) {
        rolesForSave.push(document.getElementById(primeType + index).value);
      }
    }
    // изменяем список описывающий количество полей
    let extraRolesNew = extraRoles.slice(0, -1);
    setExtraRoles(extraRolesNew);

    // вводим значения сохраненных ролей в оставшиеся поля инпутов
    document.getElementById(primeType + 0).value = rolesForSave[0];
    for (let index of extraRolesNew) {
      document.getElementById(primeType + index).value = rolesForSave[index];
    }

    // флаг говорящий о том что все поля неопределены
    let onlyDefault = true;
    if (rolesForSave.find((role) => role !== defaultValue)) {
      onlyDefault = false;
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.roles = onlyDefault ? rolesEN : rolesForSave;
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <>
      <RoleSelect
        key={0}
        index={0}
        defaultValue={defaultValue}
        deleteHandler={deleteRoleHandler}
        onChange={filterHandler}
        isOnly={!extraRoles.length}
        isSmall={isSmall}
      />
      {extraRoles.length !== 0 &&
        extraRoles.map((index) => (
          <RoleSelect
            key={index}
            index={index}
            defaultValue={defaultValue}
            deleteHandler={deleteRoleHandler}
            onChange={filterHandler}
            isOnly={0}
            isSmall={isSmall}
          />
        ))}
      <button id="add-filter" onClick={addRoleHandler}>
        Добавить должность
      </button>
    </>
  );
};

// компонент отвечающий за выбор роли
const RoleSelect = ({
  index,
  defaultValue,
  deleteHandler,
  onChange,
  isOnly,
  isSmall,
}) => {
  return (
    <div className="extra-input" id={"role " + index}>
      <label>Должность:</label>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        id={isSmall ? "role-select-small " + index : "role-select " + index}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {rolesEN?.map((role) => (
          <option key={role + index} value={role}>
            {translateRole(role)}
          </option>
        ))}
      </select>
      {!isOnly && (
        <button id={index.toString()} onClick={deleteHandler} type="button">
          <img src={cancelImg} id={index.toString()} />
        </button>
      )}
    </div>
  );
};

export default RoleSelectList;
