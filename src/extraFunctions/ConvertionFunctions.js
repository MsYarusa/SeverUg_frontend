export const tripConvertor = (trips) => {
  let tripsConverted = [];

  trips.forEach((trip, i, arr) => {
    let tripConverted = {
      id: trip.id,
      label: `№ ${trip.id}: ${trip.road.stations.at(0).name} — ${
        trip.road.stations.at(-1).name
      }`,
    };
    tripsConverted.push(tripConverted);
  });
  return tripsConverted;
};
