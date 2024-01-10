import {
  translateRole,
  translateBusStatus,
  translateDepStatus,
} from "./Translators";

describe("Testing Translators", () => {
  test("roleTranslator test: wrong params", () => {
    expect(translateRole("")).toEqual(undefined);
  });
  test("roleTranslator test: correct params", () => {
    expect(translateRole("director")).toEqual("дирекция");
  });
  test("busStatusTranslator test: wrong params", () => {
    expect(translateBusStatus("")).toEqual(undefined);
  });
  test("busStatusTranslator test: correct params", () => {
    expect(translateBusStatus("active")).toEqual("активный");
  });
  test("depStatusTranslator test: wrong params", () => {
    expect(translateDepStatus("")).toEqual(undefined);
  });
  test("depStatusTranslator test: correct params", () => {
    expect(translateDepStatus("done")).toEqual("завершен");
  });
});
