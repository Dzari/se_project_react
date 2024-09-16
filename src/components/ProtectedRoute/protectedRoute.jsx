import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
