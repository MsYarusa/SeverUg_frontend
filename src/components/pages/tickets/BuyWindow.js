import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicketPDF } from "../../../extraFunctions/PDFCreators.js";
import { clearTickets } from "../../../store/slicies/departuresSlice";
import { MAN, b_1, HAS } from "./BusSchemes/BusSchemesData";

import BusScheme from "./BusSchemes/BusScheme";
import BuyerData from "./BuyerData";

const BuyWindow = ({ cancelHandler, data }) => {
  // УПРАВЛЕНИЕ РЕЖИМОМ ОКНА
  const [currentState, setCurrentState] = useState(1);
  // хранение выбранных мест
  const nextHandler = () => {
    if (sitsSelected.length !== 0) {
      if (currentState === 1) {
        setCurrentState(2);
        setSavedSitsSelected([...sitsSelected]);
      }
      if (currentState === 2) {
        // запрос подтверждения отправки формы
        setTicketsConfirmed(ticketsConfirmed + 1);
      }
    }
  };

  const backHandler = () => {
    if (currentState === 2) {
      setCurrentState(1);
      setTicketsConfirmed(0);
    }
  };
  //ПОДРУЗКА АВТБУСА
  const [busModel, setBusModel] = useState([]);

  useEffect(() => {
    if (data) {
      switch (data.trip.bus.model) {
        case "MAN":
          setBusModel(MAN);
          break;
        case "b_1":
          setBusModel(b_1);
          break;
        case "HAS":
          setBusModel(HAS);
          break;
      }
    }
  }, [data]);

  // ПЕЧАТЬ БИЛЕТОВ
  //получение билетов сохраненных в сторе
  const tickets = useSelector((state) => state.departures.tickets);
  const [ticketsPrinted, setTicketsPrinted] = useState(false);

  console.log(tickets);

  const dispatch = useDispatch();

  // печать билетов и удаление их из стора
  useEffect(() => {
    console.log("useEffect", tickets);
    if (tickets.length !== 0) {
      for (let ticket of tickets) {
        createTicketPDF(ticket);
      }
      dispatch(clearTickets());
      setTicketsPrinted(true);
    }
  }, [tickets]);

  // хранение информации о выбранных местах
  const [sitsSelected, setSitsSelected] = useState([]);
  const [savedSitsSelected, setSavedSitsSelected] = useState([]);

  //ВАЛИДАЦИЯ
  // переменная хранящая запрос на отправку формы
  const [ticketsConfirmed, setTicketsConfirmed] = useState(0);
  // при получении полужительно ответа на запрос об отправке формы преходим далее
  useEffect(() => {
    if (ticketsConfirmed !== 0 && ticketsPrinted) {
      cancelHandler();
    }
  }, [ticketsPrinted]);

  return (
    <div className="window__container">
      <div className="window">
        <label id="main">
          {currentState === 1 ? "Выберите места" : "Оформление билетов"}
        </label>
        <div className="window__inner">
          {currentState === 1 && (
            <BusScheme
              bus={busModel}
              busLabel={data.trip.bus.model}
              data={data}
              onSelect={setSitsSelected}
              savedSitsSelected={savedSitsSelected}
            />
          )}
          {currentState === 2 && (
            <BuyerData
              data={data}
              onSubmit={ticketsConfirmed}
              sits={sitsSelected}
            />
          )}
        </div>
        <div id="buttons">
          <button id="cancel" type="button" onClick={cancelHandler}>
            Отмена
          </button>
          {currentState === 2 && (
            <button id="back" type="button" onClick={backHandler}>
              Назад
            </button>
          )}

          <button
            id="next"
            type="button"
            onClick={nextHandler}
            className={sitsSelected.length !== 0 ? "" : "button-unactive"}
          >
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyWindow;
