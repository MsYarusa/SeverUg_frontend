import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicketPDF } from "../../../extraFunctions/TicketPDFCreator";
import { clearTickets } from "../../../store/slicies/departuresSlice";
import { MAN } from "./BusSchemes/BusSchemesData";

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
      setValidation(true);
      setTicketsConfirmed(0);
    }
  };

  // ПЕЧАТЬ БИЛЕТОВ
  //получение билетов сохраненных в сторе
  const tickets = useSelector((state) => state.departures.tickets);
  const dispatch = useDispatch();

  // печать билетов и удаление их из стора
  useEffect(() => {
    if (tickets.length !== 0) {
      for (let ticket of tickets) {
        createTicketPDF(ticket);
      }
      dispatch(clearTickets());
    }
  }, [tickets]);

  // хранение информации о выбранных местах
  const [sitsSelected, setSitsSelected] = useState([]);
  const [savedSitsSelected, setSavedSitsSelected] = useState([]);

  //ВАЛИДАЦИЯ
  // переменная хранящая запрос на отправку формы
  const [ticketsConfirmed, setTicketsConfirmed] = useState(0);
  const [validation, setValidation] = useState(true);
  // при получении полужительно ответа на запрос об отправке формы преходим далее
  useEffect(() => {
    if (ticketsConfirmed !== 0 && validation) {
      cancelHandler();
    }
  }, [validation]);

  return (
    <div className="window__container">
      <div className="window">
        <label id="main">
          {currentState === 1 ? "Выберите места" : "Оформление билетов"}
        </label>
        <div className="window__inner">
          {currentState === 1 && (
            <BusScheme
              bus={MAN}
              busLabel={"MAN"}
              data={data}
              onSelect={setSitsSelected}
              savedSitsSelected={savedSitsSelected}
            />
          )}
          {currentState === 2 && (
            <BuyerData
              validation={setValidation}
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
