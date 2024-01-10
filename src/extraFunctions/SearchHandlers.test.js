import {
  routes,
  test1Expected,
  test2Expected,
  test3Expected,
} from "../tests/TestData/TestRoutes";
import { searchFromTo } from "./SearchHandlers";

describe("Testing SearchHandler", () => {
  test("test1: Empty search config", () => {
    expect(
      searchFromTo({
        route: routes[0],
        searchConfig: { from: "", to: "" },
      })
    ).toEqual(test1Expected);
  });
  test("test2: Starts with p", () => {
    expect(
      searchFromTo({
        route: routes[1],
        searchConfig: { from: "p", to: "" },
      })
    ).toEqual(test2Expected);
  });
  test("test3: Starts and ends with p", () => {
    expect(
      searchFromTo({
        route: routes[1],
        searchConfig: { from: "p", to: "p" },
      })
    ).toEqual(test3Expected);
  });
});
