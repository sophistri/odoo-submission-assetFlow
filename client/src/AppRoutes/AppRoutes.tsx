import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Login/Signup';
import Dashboard from '../Pages/Dashboard/Dashboard';
import OrgSetup from '../Pages/OrgSetup/OrgSetup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/org-setup" element={<OrgSetup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}