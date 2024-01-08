const { json } = require("react-router-dom");
const CryptoJS = require("crypto-js");
const { TYPES } = require("@babel/types");

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

// let a = "password";
// let hash = CryptoJS.SHA256(a).toString(CryptoJS.enc.Hex);
// console.log(hash);

const TYPES_DICT = {
  profit: 1,
  succes: 2,
  cancel: 3,
};
console.log(TYPES_DICT["profit"]);
