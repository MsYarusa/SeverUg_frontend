const { json } = require("react-router-dom");

const axios = require("axios").default;

// axios
//   .post("https://spacekot.ru/apishechka/login", {
//     login: "abobus",
//     password: "abobus",
//   })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// axios
//   .get("http://spacekot.ru/apishechka/schedule")
//   .then((res) => {
//     console.log(res.data);
//     data = res.data;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// let a = new Date("2023-11-01");
// console.log(a);
// console.log(typeof "dsd");
a = [
  [1, 2],
  [3, 4, 5, 6, 7],
];
if (a[3]) {
  a[3][0] = 5;
} else {
  let b = [];
  b[5] = 5;
  a[3] = b;
}
console.log(a[3][5]);
