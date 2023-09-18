import React from 'react'
import { Link } from 'react-router-dom'
const MailSuccess = () => {
  return (
    <>
    <div>Votre message a été envoyé avec succès</div>
    <Link to='/'>Retour à la page d'accueil</Link>
    </>
  )
}

export default MailSuccess
