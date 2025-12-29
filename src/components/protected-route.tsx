import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser } from '@/lib/auth';

/**
 * A wrapper component for protected routes.
 * Checks if the user is authenticated (has a valid user object in localStorage).
 * If authenticated, renders the child routes (Outlet).
 * If not, redirects to the login page.
 */
export default function ProtectedRoute() {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
