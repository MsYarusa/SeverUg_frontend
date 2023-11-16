import React, { useState } from "react";
import SchedulePage from "./components/sсhedule/SchedulePage";
import LoginPage from "./components/login/LoginPage";

function App() {
  const checkAuth = sessionStorage.getItem("isAuth");
  const [isAuth, setIsAuth] = useState(checkAuth ? checkAuth : false);

  let user = {
    token: null,
    role: null,
    firstName: "Имя",
    lastName: "Фамилия",
  };

  const getTokenAndRole = (data) => {
    user.token = data.token;
    user.role = data.role;
    user.firstName = data.first_name;
    user.lastName = data.last_name;

    setIsAuth(true);
    sessionStorage.setItem("isAuth", true);
  };

  if (!isAuth) return <LoginPage sendTokenAndRole={getTokenAndRole} />;
  else
    return <SchedulePage lastName={user.lastName} firstName={user.firstName} />;
}

export default App;
