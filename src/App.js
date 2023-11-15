import "./App.css";
import React, { useState } from "react";
import LoginForm from "./components/login/LoginForm";
import Logo from "./components/login/Logo";
import SchedulePage from "./components/sсhedule/SchedulePage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  let token = null;
  let role = null;

  const getTokenAndRole = (data) => {
    token = data.token;
    role = data.role;
    setIsAuth(true);
  };

  return (
    <div className="App">
      {/* <Logo />
      {!isAuth && <LoginForm getData={getTokenAndRole} />} */}
      <SchedulePage></SchedulePage>
    </div>
  );
}

export default App;
