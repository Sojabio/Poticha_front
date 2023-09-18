import { useAtom } from 'jotai';
import { userAtom } from '../../stores/userAtom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff} from '@fortawesome/free-solid-svg-icons';
import './logoutstyle.css';



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
    <div className='logout'>
      <button onClick={handleLogout} className='LogoutButton'><FontAwesomeIcon icon={faPowerOff} /></button>
    </div>
  );
}

export default LogoutButton;
