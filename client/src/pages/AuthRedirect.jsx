// src/components/elements/protected/AuthRedirect.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../store/slices/authSlice';

export default function AuthRedirect() {
  const user = useSelector(selectCurrentUser);
  // If already logged in, bounce away from public pages
  if (user) return <Navigate to="/" replace />;
  // Otherwise, render nested public routes
  return <Outlet />;
}
