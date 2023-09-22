import './style.css'
import { Link } from 'react-router-dom';



const LogoutSuccess = () => {

  return (
    <div className="logout">
      <div className="logout-container">
        <p> Déconnexion réussie ! </p>
        <Link  to= '/' className="link-home">
          <div className="home-button">Retour à la page d'accueil</div>
        </Link>
      </div>
    </div>
  )
}

export default LogoutSuccess
