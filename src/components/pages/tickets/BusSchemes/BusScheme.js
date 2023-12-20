import { useEffect, useState } from "react";

import "../ticketStyles/BusSchemes.css";

const BusScheme = ({ bus, busLabel, data, onSelect, savedSitsSelected }) => {
  // получение уже занятых мест
  // хранение выбранных мест
  const [sitsSelected, setSitsSelected] = useState([]);
  const [takenPlaces, setTakenPlaces] = useState([]);
  useEffect(() => {
    let takenPlaces = [];
    for (let ticket of data.tickets) {
      // получение станций посадки и высадки с билета
      let depStation = ticket.departure_point;
      let arrStation = ticket.place_of_arrival;
      // поднимаем флаги если выбранный маршрут пересекается с маршрутом билета
      let depStationFound = data.trip.road.stations
        .slice(0, -1)
        .find((station) => station.name === depStation);
      let arrStationFound = data.trip.road.stations
        .slice(1)
        .find((station) => station.name === arrStation);
      //если один из флагов поднят то место занято
      if (depStationFound || arrStationFound) {
        takenPlaces.push(ticket.place_number);
      }
    }
    setTakenPlaces([...takenPlaces]);
  }, [data]);

  // проверяем не сохранены ли у нас уже места
  useEffect(() => {
    for (let sit of savedSitsSelected) {
      document.getElementById("bus-sit " + sit).click();
    }
    setSitsSelected([...savedSitsSelected]);
  }, [savedSitsSelected]);

  useEffect(() => {
    onSelect([...sitsSelected]);
  }, [sitsSelected]);

  return (
    <>
      <label className="secondary-lable">Автобус: {busLabel}</label>
      <ul className="bus-scheme">
        <div className="driver-sit">В</div>
        {bus.map((row) => (
          <ul key={row} className="bus-sit-row">
            {row.map((item) => (
              <BusSit
                key={item === 0 ? Math.random() : item}
                number={item}
                sitsSelected={sitsSelected}
                setSitsSelected={setSitsSelected}
                takenPlaces={takenPlaces}
              />
            ))}
          </ul>
        ))}
      </ul>
    </>
  );
};

export default BusScheme;

const BusSit = ({ number, sitsSelected, setSitsSelected, takenPlaces }) => {
  // хранение состояния места
  const [sitSelected, setSitSelected] = useState(false);
  //проверка на то было ли место занято изначально
  const [placeTaken, setPlaceTaken] = useState(false);
  useEffect(() => {
    if (takenPlaces.find((sit) => sit === number)) {
      setPlaceTaken(true);
      setSitSelected(true);
    }
  }, [takenPlaces]);
  // обработка выбора места
  const selectSitHandler = () => {
    if (!placeTaken) {
      let newSitsSelected = new Set(sitsSelected);
      if (!sitSelected) {
        newSitsSelected.add(number);
      } else {
        newSitsSelected.delete(number);
      }

      setSitsSelected([...newSitsSelected]);
      setSitSelected(!sitSelected);
    }
  };
  return (
    <>
      {number === 0 ? (
        <div className="not-a-sit" />
      ) : (
        <button
          id={"bus-sit " + number}
          className={
            sitSelected
              ? placeTaken
                ? "bus-sit taken"
                : "bus-sit selected"
              : "bus-sit unselected"
          }
          onClick={selectSitHandler}
        >
          {number}
        </button>
      )}
    </>
  );
};
