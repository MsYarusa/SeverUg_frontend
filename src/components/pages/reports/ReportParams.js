import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tripConvertor } from "../../../extraFunctions/ConvertionFunctions";
import { reportsTypeEN } from "../../../extraFunctions/CONSTs/TranslatorCONSTS";
import { translateReportType } from "../../../extraFunctions/TranslateFunctions";

import cancelImg from "../../cards/buttonImgs/close.svg";
import "./reportsStyles/ReportParams.css";
import { transferDateToString } from "../../../extraFunctions/TimeFunctions";

const ReportParams = ({ createReport }) => {
  // получем необхожимые данные из стора
  const trips = useSelector((state) => state.schedule.schedule);
  // для отображения в селекторе необходимо обработать рейса из стора
  const tripLabels = tripConvertor(trips);
  // хранения количества полей для выбора даты
  const [extraTripSelectors, setExtraTripSelectors] = useState([0]);
  // тип
  const primeReportType = "report-type";
  const primeDateFrom = "min-date";
  const primeDateTo = "max-date";
  const primeTrip = "trip ";

  // ПАРАМЕТРЫ ФИЛЬТРА
  // хранение параметров фильтра
  const [configs, setConfigs] = useState({
    type: null,
    dates: { from: +new Date() - 2592000000, to: +new Date() },
    trips: [],
  });

  //Валидация
  const [errorType, setErrorType] = useState(null);
  const [errorDate, setErrorDate] = useState(null);

  // обработка инпутов фильтров
  const paramsHandler = () => {
    let type = document.getElementById(primeReportType).value;
    let dateFrom = document.getElementById(primeDateFrom).value;
    let dateTo = document.getElementById(primeDateTo).value;
    let trips = [];
    for (let s of extraTripSelectors) {
      trips.push(document.getElementById(primeTrip + s).value);
    }
    let type_error = type === "none" ? "Тип отчета не выбран" : null;
    let date_error =
      dateFrom === "" || dateTo === "" ? "Пустое поле даты" : null;
    trips = trips.indexOf("all") !== -1 ? [] : trips;

    setErrorType(type_error);
    setErrorDate(date_error);
    if (!type_error && !date_error) {
      let newConfigs = configs;
      newConfigs.type = type;
      newConfigs.dates.from = +new Date(dateFrom);
      newConfigs.dates.to = +new Date(dateTo);
      newConfigs.trips = trips;
      // изменяем старые параметры в соответствии с новыми
      setConfigs(newConfigs);
      // передаем параметры родителю
      createReport(newConfigs);
    }
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
    document.getElementById(primeReportType).value = "none";
    let today = new Date();
    let monthAgo = new Date(+new Date() - 2592000000);

    let dateTo = transferDateToString(today);
    let dateFrom = transferDateToString(monthAgo);
    document.getElementById(primeDateFrom).value = dateFrom;
    document.getElementById(primeDateTo).value = dateTo;
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
  };

  return (
    <div className="objects-list report-params">
      <h2>Получение отчета:</h2>
      <TypeSelector primeReportType={primeReportType} />
      <DateSelector primeDateFrom={primeDateFrom} primeDateTo={primeDateTo} />
      {extraTripSelectors.map((index) => (
        <TripSelect
          key={index}
          index={index}
          trips={tripLabels}
          deleteHandler={deleteTripHandler}
          isOnly={extraTripSelectors.length === 1}
          primeTrip={primeTrip}
        />
      ))}

      <button id="add-filter" onClick={addTripHandler}>
        Добавить рейс
      </button>
      {(errorDate || errorType) && (
        <p className="error">{errorDate ? errorDate : errorType}</p>
      )}
      <div className="action-button__container">
        <button id="clear" className="action-button" onClick={clearHandler}>
          Сбросить параметры
        </button>{" "}
        <button
          id="submit-report-config"
          className="action-button"
          onClick={paramsHandler}
        >
          Сформировать отчет
        </button>
      </div>
    </div>
  );
};

export default ReportParams;

// компоненты отвечающий за выбор типа отчета
const TypeSelector = ({ primeReportType }) => {
  return (
    <div className="extra-input">
      <label className="main-label">Тип отчета:</label>
      <select defaultValue={"none"} id={primeReportType}>
        <option disabled value={"none"}>
          Выбрать тип отчета
        </option>
        {reportsTypeEN?.map((type) => (
          <option key={type} value={type}>
            {translateReportType(type)}
          </option>
        ))}
      </select>
    </div>
  );
};

// компонент отвечающий за выбор периода
const DateSelector = ({ primeDateFrom, primeDateTo }) => {
  let today = new Date();
  let monthAgo = new Date(+new Date() - 2592000000);

  let dateTo = transferDateToString(today);
  let dateFrom = transferDateToString(monthAgo);
  useEffect(() => {
    document.getElementById(primeDateFrom).value = dateFrom;
    document.getElementById(primeDateTo).value = dateTo;
  }, []);
  return (
    <div className="time input__container">
      <label className="main-label">Указать период:</label>
      <div className="filter-input">
        <label>От</label>
        <input id={primeDateFrom} type="date" defaultValue={dateFrom} />
        <label>До</label>
        <input id={primeDateTo} type="date" defaultValue={dateTo} />
      </div>
    </div>
  );
};

// комопнент отвечающий за выбор рейса
const TripSelect = ({ index, trips, deleteHandler, isOnly, primeTrip }) => {
  return (
    <div className="extra-input" id={"model " + index}>
      <label>Рейс: </label>
      <select defaultValue={"all"} id={primeTrip + index}>
        <option disabled value={"all"}>
          Все рейсы
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
