import GridLayout from "./GridLayout";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navigate } from "react-router-dom";

import "../../cards/objectStyles/ObjectsPage.css";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user.role === "cashier" ? (
        <Navigate to="/tickets" />
      ) : (
        <div className="page">
          <GridLayout role={user.role} />
        </div>
      )}
    </>
  );
};

export default HomePage;
