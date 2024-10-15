import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
  const { loginWithGoogle, currentUser, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {  // Only navigate after loading is complete
      if (currentUser) {
        if (isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }
    }
  }, [currentUser, isAdmin, loading, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
};
