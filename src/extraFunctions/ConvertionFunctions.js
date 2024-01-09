export const tripConvertor = (trips) => {
  let tripsConverted = [];
  trips.forEach((trip, i, arr) => {
    let tripConverted = {
      id: trip.id,
      label: `№ ${trip.id}: ${trip.stations.at(0).name} — ${
        trip.stations.at(-1).name
      }`,
    };
    tripsConverted.push(tripConverted);
  });
  return tripsConverted;
};
