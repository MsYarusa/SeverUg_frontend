import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tripConvertor } from "../../../extraFunctions/ConvertionFunctions";
import { reportsTypeEN } from "../../../extraFunctions/CONSTs/TranslatorCONSTS";
import { translateReportType } from "../../../extraFunctions/TranslateFunctions";

const ReportConfigs = ({ saveConfig, isSmall, isVisible }) => {
  // получем необхожимые данные из стора
  const trips = useSelector((state) => state.schedule.schedule);
  // для отображения в селекторе необходимо обработать рейса из стора
  const tripLabels = tripConvertor(trips);
  // хранения количества полей для выбора даты
  const [extraTripSelectors, setExtraTripSelectors] = useState([0]);
  // тип
  const primeReportType = isSmall ? "report-type-small" : "report-type";
  const primeDateFrom = isSmall ? "min-date-small" : "min-date";
  const primeDateTo = isSmall ? "max-date-small" : "max-date";
  const primeTrip = isSmall ? "trip-small " : "trip ";

  const secondaryReportType = isSmall ? "report-type" : "report-type-small";
  const secondaryDateFrom = isSmall ? "min-date" : "min-date-small";
  const secondaryDateTo = isSmall ? "max-date" : "max-date-small";
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
  const [defaultSelectedTrips, setDefualtSelectedTrips] = useState([]);
  // клонируем значения из другого фильтра в случае если размер экрана изменился
  useEffect(() => {
    if (smallVisible === isSmall) {
      let savedTrips = [];
      let extraTripSelectors = [];
      let index = 0;
      let tripSelector = document.getElementById(secondaryDate + index);
      while (tripSelector) {
        extraTripSelectors.push(index);
        savedTrips.push(tripSelector.value);

        index += 1;
        tripSelector = document.getElementById(secondaryDate + index);
      }
      setExtraTripSelectors(extraTripSelectors);
      setDefualtSelectedTrips(savedTrips.length === 0 ? [""] : savedTrips);

      document.getElementById(primeReportType).value =
        document.getElementById(secondaryReportType).value;
      document.getElementById(primeDateFrom).value =
        document.getElementById(secondaryDateFrom).value;
      document.getElementById(primeDateTo).value =
        document.getElementById(secondaryDateTo).value;
    }
  }, [smallVisible]);

  useEffect(() => {
    let index = 0;
    for (let trip of defaultSelectedTrips) {
      if (extraTripSelectors.length !== 0 || index === 0) {
        document.getElementById(primeTrip + index).value = trip;
        index += 1;
      }
    }
  }, [defaultSelectedTrips]);

  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [configs, setConfigs] = useState({
    type: null,
    dates: { from: +new Date() - 2592000000, to: +new Date() },
    trips: [],
  });

  // обработка инпутов фильтров
  const configHandler = (event) => {
    // получаем id элемента в котором произошли изменения и значение
    let id = event.target.id;
    let value = event.target.value;
    // создаем переменную куда будем сохранять новые параметры
    let newConfigs = configs;

    // в зависимости от типа инпута соохраняем значение в соответствующее поле
    if (id === primeReportType) {
      newConfigs.type = value;
    }
    if (id === primeDateFrom) {
      if (value === "") {
        value = configs.dates.to - 2592000000;
      } else {
        value = +new Date(value);
      }
      newConfigs.dates = { from: value, to: configs.dates.to };
    }
    if (id === primeDateTo) {
      if (value === "") {
        value = +new Date();
      } else {
        value = +new Date(value);
      }
      newConfigs.dates = { from: configs.dates.from, to: value };
    }
    if (id.indexOf("trip") !== -1) {
      // считываем рейса и сохраняем их в массив
      let trips = [];
      for (let s of extraTripSelectors) {
        trips.push(document.getElementById(primeTrip + f).value);
      }

      // проверяем на наличие пустых значений
      let containsNull = false;

      for (let trip of trips) {
        if (!trip) {
          containsNull = true;
          break;
        }
      }

      newConfigs.trips = containsNull ? [] : trips;
    }
    // изменяем старые параметры в соответствии с новыми
    setConfigs(newConfigs);
    // передаем параметры родителю
    saveConfig(newConfigs);
  };

  // сброс параметров фильтра
  const clearHandler = () => {
    let newConfigs = {
      type: null,
      dates: { from: +new Date() - 2592000000, to: +new Date() },
      trips: [],
    };
    setConfigs(newConfigs);
    setExtraTripSelectors([0]);
    // отправка новых параметров родителю
    saveConfig(newConfigs);
  };

  // РАБОТА С РЕЙСАМИ
  // хранения количества полей для выбора рейсов

  // добавление селектора рейсов
  const addTripHandler = () => {
    setExtraTripSelectors([...extraTripSelectors, extraTripSelectors.length]);
  };

  //удаление рейсов
  const deleteTripHandler = (event) => {
    //сохраняем все рейсы кроме удаленной
    let tripsForSave = [];
    for (let s of extraTripSelectors) {
      if (event.target.id !== s.toString()) {
        tripsForSave.push(
          document.getElementById(primeTrip + s.toString()).value
        );
      }
    }
    // изменяем список описывающий количество полей
    let extraTripSelectorsNew =
      extraTripSelectors.slice(0, -1).length !== 0
        ? extraTripSelectors.slice(0, -1)
        : [0];
    setExtraTripSelectors(extraTripSelectorsNew);

    // вводим значения сохраненных рейсов в оставшиеся поля инпутов
    for (let s of extraTripSelectorsNew) {
      document.getElementById(primeTrip + s.toString()).value = tripsForSave[s];
    }

    // изменяем параметры фильтра
    let newConfigs = configs;
    newConfigs.trips = tripsForSave;
    setConfigs(newConfigs);
    saveConfig(newConfigs);
  };

  return (
    <>
      {isSmall ? (
        <ObjectFilterSmall clearHandler={clearHandler} isVisible={isVisible}>
          <div className="multiple-input__container">
            <div className="filter-label-input">
              <label>Выбрать тип отчета:</label>
              <TypeSelector primeReportType={primeReportType} />
            </div>
            <div className="filter-label-input">
              <label>Указать период:</label>
              <DateSelector
                primeDateFrom={primeDateFrom}
                primeDateTo={primeDateTo}
              />
            </div>
          </div>

          <label>Выбрать рейс:</label>
          <div className="multiple-input__container">
            {selectedTrips.length !== 0 &&
              selectedTrips.map((index) => (
                <TripSelect
                  key={index}
                  index={index}
                  trips={tripLabels}
                  deleteHandler={deleteTripHandler}
                  isOnly={!selectedTrips.length}
                  primeTrip={secondaryTrip}
                />
              ))}
            <button id="add-filter" onClick={addTripHandler}>
              Добавить рейс
            </button>
          </div>
        </ObjectFilterSmall>
      ) : (
        <ObjectFilter clearHandler={clearHandler}>
          <TypeSelector primeReportType={primeReportType} />
          <DateSelector
            primeDateFrom={primeDateFrom}
            primeDateTo={primeDateTo}
          />
          {selectedTrips.length !== 0 &&
            selectedTrips.map((index) => (
              <TripSelect
                key={index}
                index={index}
                trips={tripLabels}
                deleteHandler={deleteTripHandler}
                isOnly={!selectedTrips.length}
                primeTrip={primeTrip}
              />
            ))}
          <button id="add-filter" onClick={addTripHandler}>
            Добавить рейс
          </button>
          <button id="submit-report-config" onClick={configHandler}>
            Сформировать отчет
          </button>
        </ObjectFilter>
      )}
    </>
  );
};

export default ReportConfigs;

// компоненты отвечающий за выбор типа отчета
const TypeSelector = ({ primeReportType }) => {
  return (
    <select defaultValue={null} id={primeReportType}>
      <option disabled value={null}>
        Выбрать тип отчета
      </option>
      {reportsTypeEN?.map((type) => (
        <option key={type} value={trip}>
          {translateReportType(type)}
        </option>
      ))}
    </select>
  );
};

// компонент отвечающий за выбор периода
const DateSelector = ({ primeDateFrom, primeDateTo }) => {
  return (
    <div className="time input__container">
      <label className="main-label">Указать период:</label>
      <div className="filter-input">
        <label>От</label>
        <input id={primeDateFrom} type="date" />
        <label>До</label>
        <input id={primeDateTo} type="date" />
      </div>
    </div>
  );
};

// комопнент отвечающий за выбор рейса
const TripSelect = ({ index, trips, deleteHandler, isOnly, primeTrip }) => {
  return (
    <div className="extra-input" id={"model " + index}>
      <label>Рейс:</label>
      <select defaultValue={null} id={primeTrip + index}>
        <option disabled value={null}>
          Выбрать
        </option>
        {trips?.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {trip.label}
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
