import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    children: JSX.Element;
    adminOnly?: boolean;
}

export const PrivateRoute = ({ children, adminOnly }: PrivateRouteProps) => {
    const { currentUser, isAdmin, loading } = useAuth();

    // Show loading screen until admin status is confirmed
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or loading screen
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};
