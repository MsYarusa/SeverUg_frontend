const axios = require("axios").default;

axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    login: "abobus",
    password: "abobs",
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
