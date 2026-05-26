import { Navigate, Route, Routes } from "react-router-dom";

// real page imports
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import ReportsPage from "../pages/ReportsPage";
import FormPage from "../pages/FormPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import StateAdminDashboardPage from "../pages/StateAdminDashboardPage";

// lightweight placeholders for admin and other views still under development
const AdminReportsPage = () => <div>AdminReportsPage</div>;
const AdminExportReportsPage = () => <div>AdminExportReportsPage</div>;

const LogoutPage = () => <div>Logging out...</div>;
const NotFoundPage = () => <div>NotFoundPage</div>;

/**
 * Placeholder guards (replace with real auth logic)
 */
const ProtectedRoute = ({ children }) => children;
const AdminRoute = ({ children }) => {
  const adminToken = localStorage.getItem('admin_token');
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ResetPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Authenticated app routes */}
      <Route 
        path="/app/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/reports/new"
        element={
          <ProtectedRoute>
            <FormPage />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <StateAdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <AdminReportsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/reports/export"
        element={
          <AdminRoute>
            <AdminExportReportsPage />
          </AdminRoute>
        }
      />

      {/* Logout */}
      <Route path="/logout" element={<LogoutPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
