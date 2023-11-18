import SchedulePage from "./components/sсhedule/SchedulePage";
import LoginPage from "./components/login/LoginPage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const user = useSelector((state) => state.user.user);
  if (!user) return <LoginPage />;
  else return <SchedulePage />;
}

export default App;
