import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Login/Signup';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<div>Dashboard placeholder</div>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}