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
        console.log('Book deleted successfully');
        navigate(`/ouvrages`)
      } else {
        console.log('Failed to delete book');
      }
    } catch (error) {
      console.error('An error occurred while deleting book:', error);
    }
  }


  return (
    <button onClick={handleDestroy} className='delete-button'>Supprimer cet ouvrage</button>
  )
}

export default DestroyBook
