import "./App.css";
import React, { useState } from "react";
import LoginForm from "./components/login/LoginForm";
import Logo from "./components/login/Logo";

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
      <Logo />
      {!isAuth && <LoginForm getData={getTokenAndRole} />}
    </div>
  );
}

export default App;
