import SchedulePage from "./components/sсhedule/SchedulePage";
import LoginPage from "./components/login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RequireAuth from "./hoc/RequireAuth";

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
        <Route index element={<SchedulePage />} />
      </Route>
    </Routes>
  );
}

export default App;
