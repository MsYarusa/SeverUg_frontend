import { sum } from "./BaseFunctions";

export function searchFromTo({ route, searchConfig }) {
  // в случае если параметры поиска не указаны, просто выводим маршрут целиком
  let from =
    searchConfig.from === ""
      ? route.stations.at(0).name.toLowerCase()
      : searchConfig.from;
  let to =
    searchConfig.to === ""
      ? route.stations.at(-1).name.toLowerCase()
      : searchConfig.to;

  // пробегаемся по начальным станциям
  let fromRoutes = [];
  route.stations?.slice(0, -1).forEach((item, i, arr) => {
    let routeFrom = item.name.toLowerCase();
    let searchedFrom = routeFrom.indexOf(from);
    if (searchedFrom === 0) {
      let newRoute = {
        id: route.id + " from" + item.name,
        cost: route.cost.slice(i),
        time: route.time.slice(i),
        stations: route.stations.slice(i),
        departure_time: sum(route.time.slice(0, i)),
      };
      fromRoutes.push(newRoute);
    }
  });

  // пробегаемся по конечным станциям
  let newRoutes = [];
  let newDepartureTime = [];
  for (let fromRoute of fromRoutes) {
    fromRoute.stations?.slice(1).forEach((item, i, arr) => {
      let routeTo = item.name.toLowerCase();
      let searchedTo = routeTo.indexOf(to);
      if (searchedTo === 0) {
        let newRoute = {
          id: fromRoute.id + "to" + item.name,
          cost: fromRoute.cost.slice(0, i + 1),
          time: fromRoute.time.slice(0, i + 1),
          stations: fromRoute.stations.slice(0, i + 2),
        };
        newDepartureTime.push(fromRoute.departure_time);
        newRoutes.push(newRoute);
      }
    });
  }
  // сохраняем подходящие результаты
  return { routes: newRoutes, departureTime: newDepartureTime };
}
