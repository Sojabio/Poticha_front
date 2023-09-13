import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

const DestroyBook = ({bookId, onDelete}) => {
  const [user] = useAtom(userAtom);
  const BookId = bookId

  const handleDestroy = async () => {
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
        onDelete();
      } else {
        console.log('Failed to delete book');
      }
    } catch (error) {
      console.error('An error occurred while deleting book:', error);
    }
  }


  return (
    <button onClick={handleDestroy}>Supprimer cet ouvrage</button>
  )
}

export default DestroyBook
