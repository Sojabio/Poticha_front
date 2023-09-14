import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import './style.css';

const DestroyAuthor = ({authorId, onDelete}) => {
  const [user] = useAtom(userAtom);
  const AuthorId = authorId

  const handleDestroy = async () => {
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
        onDelete();
      } else {
        console.log('Failed to delete author');
      }
    } catch (error) {
      console.error('An error occurred while deleting author:', error);
    }
  }


  return (
    <button onClick={handleDestroy} className='delete-button'>Supprimer ce-tte auteurice</button>
  )
}

export default DestroyAuthor
