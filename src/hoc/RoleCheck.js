import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleCheck = ({ children, roles }) => {
  const user = useSelector((state) => state.user.user);

  if (roles.find((role) => role === user.role)) {
    return children;
  }

  return (
    <>
      {user.role === "cashier" ? (
        <Navigate to="/tickets" />
      ) : user.role === "director" ? (
        <Navigate to="/reports" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RoleCheck;
