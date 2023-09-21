
import { Link } from 'react-router-dom'
const MailSuccess = () => {
  return (
    <div className="logout">
      <div className="logout-container">
        <p> Message envoyé ! </p>
        <Link  to= '/' className="link-home">
          <div className="home-button">Retour à la page d'accueil</div>
        </Link>
      </div>
    </div>
  )
}

export default MailSuccess
