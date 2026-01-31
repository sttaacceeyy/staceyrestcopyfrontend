import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, redirectTo = '/login' }) => {
  const { user } = React.useContext(AuthContext);
  const location = useLocation();
  if (!user) return <Navigate to={redirectTo} replace state={{ from: location }} />;
  if (allowedRoles.includes(user.role)) {
    return <Outlet />;
  }
  return (
    <div style={{ padding: 40, textAlign: 'center', color: 'crimson' }}>
      <h2>Unauthorized</h2>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default ProtectedRoute;
