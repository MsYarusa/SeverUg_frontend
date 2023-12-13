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

const ob = [{ a: 1, b: 2 }];
let ad = ob;
for (let o of ad) {
  o.a = 3;
}
let a = 1;

console.log(-a);
