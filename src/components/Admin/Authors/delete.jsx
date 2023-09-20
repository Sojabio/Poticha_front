import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import './style.css';
import { useNavigate } from 'react-router-dom';

const DestroyAuthor = ({authorId, onDelete}) => {
  const [user] = useAtom(userAtom);
  const AuthorId = authorId
  const navigate = useNavigate();


  const handleDestroy = async () => {
    const shouldDelete = window.confirm("Confirmer la suppression?");

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(API_URL + '/authors/' + AuthorId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Author deleted successfully');
        navigate(`/auteurices`)

      } else {
        console.log('Failed to delete author');
      }
    } catch (error) {
      console.error('An error occurred while deleting author:', error);
    }
  }


  return (
    <button onClick={handleDestroy} className='delete-button'>Supprimer l'auteurice</button>
  )
}

export default DestroyAuthor
