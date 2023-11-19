import SchedulePage from "./components/sсhedule/SchedulePage";
import LoginPage from "./components/login/LoginPage";
import HomePage from "./components/home/HomePage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./hoc/RequireAuth";
import EmployeesPage from "./components/employees/EmployeesPage";
import NotFound from "./components/cards/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="tickets" element={<SchedulePage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
