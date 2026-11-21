import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { FarmerLayout } from "@/layouts/FarmerLayout";
import { OfficerLayout } from "@/layouts/OfficerLayout";

// Public
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DeterrentLibrary from "@/pages/DeterrentLibrary";

// Farmer
import FarmerDashboard from "@/pages/farmer/Dashboard";
import ReportIncident from "@/pages/farmer/ReportIncident";
import IncidentMap from "@/pages/farmer/IncidentMap";
import Claims from "@/pages/farmer/Claims";
import ClaimDetail from "@/pages/farmer/ClaimDetail";
import FarmerIncidentDetail from "@/pages/farmer/IncidentDetail";
import FarmerProfile from "@/pages/farmer/Profile";

// Officer
import OfficerDashboard from "@/pages/officer/Dashboard";
import Incidents from "@/pages/officer/Incidents";
import OfficerIncidentDetail from "@/pages/officer/IncidentDetail";
import Notifications from "@/pages/officer/Notifications";
import OfficerProfile from "@/pages/officer/Profile";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/library" element={<DeterrentLibrary />} />

            {/* Farmer */}
            <Route path="/farmer" element={<FarmerLayout />}>
              <Route index element={<FarmerDashboard />} />
              <Route path="report" element={<ReportIncident />} />
              <Route path="map" element={<IncidentMap />} />
              <Route path="claims" element={<Claims />} />
              <Route path="claims/:id" element={<ClaimDetail />} />
              <Route path="incidents/:id" element={<FarmerIncidentDetail />} />
              <Route path="profile" element={<FarmerProfile />} />
            </Route>

            {/* Officer */}
            <Route path="/officer" element={<OfficerLayout />}>
              <Route index element={<OfficerDashboard />} />
              <Route path="incidents" element={<Incidents />} />
              <Route
                path="incidents/:id"
                element={<OfficerIncidentDetail />}
              />
              <Route path="notifications" element={<Notifications />} />
              <Route path="profile" element={<OfficerProfile />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}