import React from "react";

const LoginPage = () => {
  const [isAuth, setIsAuth] = useState(false);

  let token = null;
  let role = null;

  const getTokenAndRole = (data) => {
    token = data.token;
    role = data.role;
    setIsAuth(true);
  };

  return (
    <div>
      <Logo />
      {!isAuth && <LoginForm getData={getTokenAndRole} />}
    </div>
  );
};

export default LoginPage;
