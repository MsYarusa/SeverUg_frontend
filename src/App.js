import SchedulePage from "./components/pages/schedule/SchedulePage";
import LoginPage from "./components/pages/login/LoginPage";
import HomePage from "./components/pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./hoc/RequireAuth";
import RoleCheck from "./hoc/RoleCheck";
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
        <Route
          path="employees"
          element={
            <RoleCheck roles={["admin", "manager"]}>
              <EmployeesPage />
            </RoleCheck>
          }
        />
        <Route
          path="schedule"
          element={
            <RoleCheck roles={["admin", "manager"]}>
              <SchedulePage />
            </RoleCheck>
          }
        />
        <Route
          path="routes"
          element={
            <RoleCheck roles={["admin", "manager"]}>
              <RoutesPage />
            </RoleCheck>
          }
        />
        <Route
          path="stations"
          element={
            <RoleCheck roles={["admin", "manager"]}>
              <StationsPage />
            </RoleCheck>
          }
        />
        <Route
          path="buses"
          element={
            <RoleCheck roles={["admin", "manager"]}>
              <BusesPage />
            </RoleCheck>
          }
        />
        <Route
          path="canceled"
          element={
            <RoleCheck roles={["admin", "director"]}>
              <NotFound />
            </RoleCheck>
          }
        />
        <Route
          path="successful"
          element={
            <RoleCheck roles={["admin", "director"]}>
              <NotFound />
            </RoleCheck>
          }
        />
        <Route
          path="profit"
          element={
            <RoleCheck roles={["admin", "director"]}>
              <NotFound />
            </RoleCheck>
          }
        />
        <Route
          path="tickets"
          element={
            <RoleCheck roles={["admin", "cashier"]}>
              <NotFound />
            </RoleCheck>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
