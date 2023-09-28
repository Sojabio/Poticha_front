import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import { useNavigate } from 'react-router-dom';

import './style.css'

const DestroyBook = ({bookId}) => {
  const [user] = useAtom(userAtom);
  const BookId = bookId
  const navigate = useNavigate();


  const handleDestroy = async () => {
    const shouldDelete = window.confirm("Confirmer la suppression ?");

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(API_URL + '/books/' + BookId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Ouvrage supprimé avec succès');
        navigate(`/ouvrages`)
      } else {
        console.log("Erreur lors de la suppression de l'ouvrage");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'ouvrage", error);
    }
  }


  return (
    <button onClick={handleDestroy} className='delete-button'>Supprimer cet ouvrage</button>
  )
}

export default DestroyBook
