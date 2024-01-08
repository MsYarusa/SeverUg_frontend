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
import TicketPage from "./components/pages/tickets/TicketPage";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://39b84f6ce2a366bedeae8d7e6cd72c46@o4506533823381504.ingest.sentry.io/4506533824823296",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", "https://ylzaporozhskiy.ru/"],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
              <TicketPage />
            </RoleCheck>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
