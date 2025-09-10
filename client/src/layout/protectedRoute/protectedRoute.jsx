import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && allowedRoles !== user.role) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}