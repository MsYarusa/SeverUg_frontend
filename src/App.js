import SchedulePage from "./components/pages/schedule/SchedulePage";
import LoginPage from "./components/pages/login/LoginPage";
import HomePage from "./components/pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./hoc/RequireAuth";
import EmployeesPage from "./components/pages/employees/EmployeesPage";
import NotFound from "./components/cards/NotFound";
import RoutesPage from "./components/pages/routes/RoutesPage";
import StationsPage from "./components/pages/stations/StationsPage";
import BusesPage from "./components/pages/buses/BusesPage";

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
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="stations" element={<StationsPage />} />
        <Route path="buses" element={<BusesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
