import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({
      id: '',
      isLoggedIn: false,
      token: '',
    });
    navigate('/logoutsuccess')
    Cookies.remove('token');
    Cookies.remove('id');

  };

  return (
    <button onClick={handleLogout} className='LogoutButton'>Déconnexion</button>
  );
}

export default LogoutButton;
