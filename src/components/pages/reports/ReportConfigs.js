import { useEffect, useState } from "react";

const ReportConfigs = () => {
  // хранения количества полей для выбора даты
  const [selectedTrips, setSelectedTrips] = useState([0]);
  // тип
  const primeReportType = isSmall ? "report-type-small" : "report-type";
  const primeTimeFrom = isSmall ? "min-time-small" : "min-time";
  const primeTimeTo = isSmall ? "max-time-small" : "max-time";
  const primeTrip = isSmall ? "trip-small " : "trip ";

  const secondaryReportType = isSmall ? "report-type" : "report-type-small";
  const secondaryTimeFrom = isSmall ? "min-time" : "min-time-small";
  const secondaryTimeTo = isSmall ? "max-time" : "max-time-small";
  const secondaryTrip = isSmall ? "trip " : "trip-small ";

  // ИНИЦИАЛИЗАЦИЯ
  // получение и хранение ширины окна
  const [smallVisible, setSmallVisible] = useState(window.innerWidth);

  const resizeHandler = () => {
    setSmallVisible(window.innerWidth < 1500);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // хранения значений
  const [defaulSelectedTrips, setDefualtSelectedTrips] = useState([]);
  // клонируем значения из другого фильтра в случае если размер экрана изменился
  useEffect(() => {
    if (smallVisible === isSmall) {
      let savedTrips = [];
      let selectedTrips = [];
      let index = 0;
      let tripSelector = document.getElementById(secondaryDate + index);
      while (tripSelector) {
        selectedTrips.push(index);
        savedTrips.push(tripSelector.value);

        index += 1;
        tripSelector = document.getElementById(secondaryDate + index);
      }
      setSelectedTrips(selectedTrips);
      setSelectedTrips(savedTrips.length === 0 ? [""] : savedTrips);

      document.getElementById(primeReportType).value =
        document.getElementById(secondaryReportType).value;
      document.getElementById(primeTimeFrom).value =
        document.getElementById(secondaryTimeFrom).value;
      document.getElementById(primeTimeTo).value =
        document.getElementById(secondaryTimeTo).value;
    }
  }, [smallVisible]);

  useEffect(() => {
    let index = 0;
    for (let trip of defaulSelectedTrips) {
      if (selectedTrips.length !== 0 || index === 0) {
        document.getElementById(primeTrip + index).value = trip;
        index += 1;
      }
    }
  }, [defaulSelectedTrips]);

  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [filterConfig, setFilterConfig] = useState({
    cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
    time: { from: 0, to: Number.MAX_SAFE_INTEGER },
    days: [],
  });

  // обработка инпутов фильтров
  const filterHandler = (event) => {
    // получаем id элемента в котором произошли изменения и значение
    let id = event.target.id;
    let value = event.target.value;
    // создаем переменную куда будем сохранять новые параметры
    let newFilterConfig = filterConfig;

    // в зависимости от типа инпута соохраняем значение в соответствующее поле
    if (id === primeCostFrom) {
      // проверка на пустую строку
      newFilterConfig.cost = { from: value, to: filterConfig.cost.to };
    }
    if (id === primeCostTo) {
      value = value === "" ? Number.MAX_SAFE_INTEGER : value;
      newFilterConfig.cost = { from: filterConfig.cost.from, to: value };
    }
    if (id === primeTimeFrom) {
      if (value === "") {
        value = 0;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: value, to: filterConfig.time.to };
    }
    if (id === primeTimeTo) {
      if (value === "") {
        value = Number.MAX_SAFE_INTEGER;
      } else {
        value = getMinsFromTime(value);
      }
      newFilterConfig.time = { from: filterConfig.time.from, to: value };
    }
    if (id.indexOf("date") !== -1) {
      newFilterConfig.days = dateHandler(extraDateFilters, primeDate);
    }
    // изменяем старые параметры в соответствии с новыми
    setFilterConfig(newFilterConfig);
    // передаем параметры родителю
    onFilter(newFilterConfig);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newFilterConfig = {
      cost: { from: 0, to: Number.MAX_SAFE_INTEGER },
      time: { from: 0, to: Number.MAX_SAFE_INTEGER },
      days: [],
    };
    setFilterConfig(newFilterConfig);
    setExtraDateFilters([0]);
    // отправка новых параметров родителю
    onFilter(newFilterConfig);
  };

  // РАБОТА С ДАТАМИ
  // хранения количества полей для ввода дат

  // добавление даты
  const addDateHandler = () => {
    setExtraDateFilters([...extraDateFilters, extraDateFilters.length]);
  };

  //удаление даты
  const deleteDateHandler = (event) => {
    //сохраняем все даты кроме удаленной
    let datesForSave = [];
    for (let f of extraDateFilters) {
      if (event.target.id !== f.toString()) {
        datesForSave.push(
          document.getElementById(primeDate + f.toString()).value
        );
      }
    }
    // изменяем список описывающий количество полей
    let extraDateFiltersNew =
      extraDateFilters.slice(0, -1).length !== 0
        ? extraDateFilters.slice(0, -1)
        : [0];
    setExtraDateFilters(extraDateFiltersNew);

    // вводим значения сохраненных дат в оставшиеся поля инпутов
    for (let f of extraDateFiltersNew) {
      document.getElementById(primeDate + f.toString()).value = datesForSave[f];
    }

    // изменяем параметры фильтра
    let newFilterConfig = filterConfig;
    newFilterConfig.days = dateHandler(extraDateFiltersNew);
    setFilterConfig(newFilterConfig);
    onFilter(newFilterConfig);
  };

  return (
    <>
      {isSmall ? (
        <ObjectFilterSmall clearHandler={clearHandler} isVisible={isVisible}>
          <div className="multiple-input__container">
            <div className="filter-label-input">
              <label>Стоимость:</label>
              <CostInput
                onChange={filterHandler}
                primeCostFrom={primeCostFrom}
                primeCostTo={primeCostTo}
              />
            </div>
            <div className="filter-label-input">
              <label>Время:</label>
              <TimeInput
                onChange={filterHandler}
                primeTimeFrom={primeTimeFrom}
                primeTimeTo={primeTimeTo}
              />
            </div>
          </div>

          <label>Дата:</label>
          <div className="multiple-input__container">
            <ModelSelect
              key={0}
              index={0}
              defaultValue="Выбрать"
              models={modelLables}
              deleteHandler={deleteRoleHandler}
              onChange={filterHandler}
              isOnly={!extraModelFilter.length}
              primeModel={primeModel}
            />
            {extraModelFilter.length !== 0 &&
              extraModelFilter.map((index) => (
                <ModelSelect
                  key={index}
                  index={index}
                  defaultValue="Выбрать"
                  models={modelLables}
                  deleteHandler={deleteRoleHandler}
                  onChange={filterHandler}
                  isOnly={0}
                  primeModel={primeModel}
                />
              ))}
            <button id="add-filter" onClick={addRoleHandler}>
              Добавить модель
            </button>
          </div>
        </ObjectFilterSmall>
      ) : (
        <ObjectFilter clearHandler={clearHandler}>
          <CostInput
            onChange={filterHandler}
            primeCostFrom={primeCostFrom}
            primeCostTo={primeCostTo}
          />
          <TimeInput
            onChange={filterHandler}
            primeTimeFrom={primeTimeFrom}
            primeTimeTo={primeTimeTo}
          />
          <ModelSelect
            key={0}
            index={0}
            defaultValue="Выбрать"
            models={modelLables}
            deleteHandler={deleteRoleHandler}
            onChange={filterHandler}
            isOnly={!extraModelFilter.length}
            primeModel={primeModel}
          />
          {extraModelFilter.length !== 0 &&
            extraModelFilter.map((index) => (
              <ModelSelect
                key={index}
                index={index}
                defaultValue="Выбрать"
                models={modelLables}
                deleteHandler={deleteRoleHandler}
                onChange={filterHandler}
                isOnly={0}
                primeModel={primeModel}
              />
            ))}
          <button id="add-filter" onClick={addRoleHandler}>
            Добавить модель
          </button>
        </ObjectFilter>
      )}
    </>
  );
};

export default ReportConfigs;

// комопнент отвечающий за выбор рейса
const DateSelect = ({
  index,
  defaultValue,
  trips,
  deleteHandler,
  onChange,
  isOnly,
  primeTrip,
}) => {
  return (
    <div className="extra-input" id={"model " + index}>
      <label>Рейс:</label>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        id={primeTrip + index}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {trips?.map((trip) => (
          <option key={trip + index} value={trip}>
            {trip}
          </option>
        ))}
      </select>
      {!isOnly && (
        <button id={index.toString()} onClick={deleteHandler}>
          <img src={cancelImg} id={index.toString()} />
        </button>
      )}
    </div>
  );
};

// функция, получающая значения дат и преобразующая их в удоборомый формат
const dateHandler = (extraDateFilters, primeDate) => {
  // считываем даты и сохраняем их в массив
  let dateData = [];
  for (let f of extraDateFilters) {
    dateData.push(document.getElementById(primeDate + f).value);
  }
  // создаем множество для сохраненния преобразованных дат в дни недели
  let weekDays = new Set();
  // задаем флаг указывающий на наличие пустых полей
  let dateIsNull = false;

  // преобразуем и сохраняем даты
  dateData.forEach((item, i, arr) => {
    if (item) {
      let day = new Date(item);
      weekDays.add(day.getDay());
    } else {
      dateIsNull = true;
    }
  });
  // возвращаем список дат
  return dateIsNull ? [] : [...weekDays];
};
