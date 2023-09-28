import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      const id = Cookies.get('id');

      if (token) {
        setUser({
          id: id,
          isLoggedIn: true,
          token: token,
        });
      }

      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
