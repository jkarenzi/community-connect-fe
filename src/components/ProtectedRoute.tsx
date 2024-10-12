import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface PrivateProps {
    children: React.ReactNode,
    allowedRoles: string[]
}

const PrivateRoute = ({ children, allowedRoles }: PrivateProps) => {
  const navigate = useNavigate();
  const {token,user} = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    if(!allowedRoles.includes(user!.role)){
        navigate('/login');
    }
  }, [token, user])

  if(!token) return null;

  return <>{children}</>;
};

export default PrivateRoute;
