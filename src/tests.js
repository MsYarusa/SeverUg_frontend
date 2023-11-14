const axios = require("axios").default;

axios
  .post("https://spacekot.ru/apishechka/login", {
    login: "abobs",
    password: "abobus",
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
