import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Employees from "./components/Employees";
import Salaries from "./components/Salaries";
import { initialEmployees, initialSalaryHistory } from "./data";
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/local-storage";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ProtectedRoute from "@/utils/ProtectedRoute";
import HistoryLogs from "./components/HistoryLogs";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import { EmployeeProvider } from "./context/EmployeeContext";
import { SalaryHistoryProvider } from "./context/SalaryHistoryContext";
import { UserProvider } from "./context/UserContext";

function App() {
  const [employees, setEmployees] = useState(() =>
    getFromLocalStorage("employees", initialEmployees)
  );
  const [salaryHistory, setSalaryHistory] = useState(() =>
    getFromLocalStorage("salaryHistory", initialSalaryHistory)
  );

  useEffect(() => {
    saveToLocalStorage("employees", employees);
  }, [employees]);

  useEffect(() => {
    saveToLocalStorage("salaryHistory", salaryHistory);
  }, [salaryHistory]);

  return (
    <UserProvider>
      <EmployeeProvider>
        <SalaryHistoryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Employees />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/salaries"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Salaries />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/history-logs"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <HistoryLogs />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SalaryHistoryProvider>
      </EmployeeProvider>
    </UserProvider>
  );
}

export default App;

function Layout({ children }) {
  const location = useLocation();

  const hideSidebarRoutes = ["/register", "/login"];

  return (
    <div className="flex h-screen">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="flex-grow">{children}</div>
    </div>
  );
}
