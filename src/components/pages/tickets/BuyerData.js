import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postTicket } from "../../../store/requests/DeparturesRequests";
import { sum } from "../../../extraFunctions/ExtraFunctions";

import "./ticketStyles/BuyerData.css";

const BuyerData = ({ validation, sits, data, onSubmit }) => {
  // заполнение данных рейса и рендер форм ввода данных пользователей
  const [sitsSelected, setSitsSelected] = useState([]);
  const [buyersRendered, setBuyersRendered] = useState(false);
  useEffect(() => {
    setSitsSelected(sits);
  }, [sits]);

  useEffect(() => {
    setBuyersRendered(true);
  }, [sitsSelected]);

  useEffect(() => {
    if (buyersRendered) {
      for (let sit of sits) {
        document.getElementById("sit " + sit).value = "место " + sit;
        document.getElementById("dep-date " + sit).value =
          "Дата:      " + new Date(data.date).toISOString().split("T")[0];
        document.getElementById("dep-time " + sit).value =
          "Время отбытия:     " + data.trip.departure_time;
        document.getElementById("dep-cost " + sit).value =
          "Стоимость:     " + sum(data.trip.road.cost) + " руб.";
        document.getElementById("dep-stations " + sit).value =
          data.trip.road.stations.at(0).name +
          " — " +
          data.trip.road.stations.at(-1).name;
      }
    }
  }, [buyersRendered]);

  // ВАЛИДАЦИЯ
  // флаги проверяющие корректность введенных данных пользователя
  const [lastNameOk, setLastNameOk] = useState(true);
  const [firstNameOk, setFirstNameOk] = useState(true);

  // отслеживания нажатия на кнопку далее
  useEffect(() => {
    if (onSubmit !== 0) {
      submitHandler();
      console.log(onSubmit);
    }
  }, [onSubmit]);

  const dispatch = useDispatch();
  const submitHandler = () => {
    let tickets = [];

    let firstNameOk = true;
    let lastNameOk = true;

    // пробегаемся по пользователям и сохраняем их
    for (let sit of sits) {
      // получение данных отбытия
      const date = document.getElementById("dep-date " + sit).value;
      const time = document.getElementById("dep-time " + sit).value;
      const [depStation, arrStation] = document
        .getElementById("dep-stations " + sit)
        .value.split(" — ");
      // получение данных пользователя
      let firstName = document.getElementById("buyer-first-name " + sit).value;
      let lastName = document.getElementById("buyer-last-name " + sit).value;
      let fatherName = document.getElementById(
        "buyer-father-name " + sit
      ).value;
      // проверка корректности введенных данных
      firstNameOk = firstName !== "" && firstNameOk;
      lastNameOk = lastNameOk !== "" && lastName;

      console.log("name", firstName, "last", lastName);

      tickets.push({
        departure_id: data.id,
        bus_route_id: data.trip.bus.id,
        place_number: sit,
        trip_id: data.trip.id,
        date: date,
        time: time + ":00",

        departure_point: depStation,
        place_of_arrival: arrStation,

        is_visited: 0,
        first_name: firstName,
        last_name: lastName,
        surname: fatherName,
      });
    }

    // поднимаем флаги
    setFirstNameOk(firstNameOk);
    setLastNameOk(lastNameOk);
    validation(firstNameOk && lastNameOk);
    console.log(firstNameOk, lastNameOk);
    if (firstNameOk && lastNameOk) {
      dispatch(postTicket(tickets));
    }
  };

  return (
    <div id="buyers" className="buyers-list__container">
      <ul className="buyers-list">
        {sitsSelected?.map((sit) => (
          <Buyer key={sit} sit={sit} submited={onSubmit} />
        ))}
      </ul>
    </div>
  );
};

export default BuyerData;

const Buyer = ({ sit, submited }) => {
  console.log(submited);
  // валидация имени и фамилии
  const [firstNameOk, setFirstNameOk] = useState(false);
  const [lastNameOk, setLastNameOk] = useState(false);
  const lastnameHandler = (event) => {
    if (event.target.value === "" && lastNameOk) {
      setLastNameOk(false);
    } else if (!lastNameOk) {
      setLastNameOk(true);
    }
  };
  const firstnameHandler = (event) => {
    if (event.target.value === "" && firstNameOk) {
      console.log("failed");
      setFirstNameOk(false);
    } else if (!firstNameOk) {
      setFirstNameOk(true);
    }
  };
  return (
    <div className="buyer__container">
      <label className="secondary-label buyer-label">Данные рейса</label>
      <input id={"sit " + sit} type="text" disabled />
      <input id={"dep-cost " + sit} type="text" disabled />
      <input id={"dep-date " + sit} type="text" disabled />
      <input id={"dep-time " + sit} type="text" disabled />
      <input
        id={"dep-stations " + sit}
        type="text"
        className="dep-stations"
        disabled
      />
      <label className="secondary-label buyer-label">Данные покупателя</label>
      <input
        id={"buyer-last-name " + sit}
        type="text"
        className={
          lastNameOk || submited === 0
            ? "buyer-last-name base-border"
            : "buyer-last-name error-border"
        }
        onChange={lastnameHandler}
        placeholder="Фамилия"
        autoComplete="off"
      />
      <input
        id={"buyer-first-name " + sit}
        type="text"
        placeholder="Имя"
        className={
          firstNameOk || submited === 0 ? "base-border" : "error-border"
        }
        onChange={firstnameHandler}
        autoComplete="off"
      />
      <input
        id={"buyer-father-name " + sit}
        type="text"
        placeholder="Отчество (при наличии)"
        autoComplete="off"
      />
    </div>
  );
};
