import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const userEmail = localStorage.getItem('nova_userEmail');

    if(!userEmail){
        return <Navigate to="/login" replace />;
    }

    return children;
}