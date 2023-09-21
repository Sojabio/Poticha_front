import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import { useNavigate } from 'react-router-dom';
import './style.css'


const DestroyPost = ({postId}) => {
  const [user] = useAtom(userAtom);
  const PostId = postId
  const navigate = useNavigate();

  const handleDestroy = async () => {
    const shouldDelete = window.confirm("Confirmer la suppression ?");

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await fetch(API_URL + '/posts/' + PostId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
      });

      if (response.ok) {
        console.log('Post deleted successfully');
        navigate(`/actus`)

      } else {
        console.log('Failed to delete post');
      }
    } catch (error) {
      console.error('An error occurred while deleting post:', error);
    }
  }


  return (
    <button onClick={handleDestroy} className='delete-button'>Supprimer ce post</button>
  )
}

export default DestroyPost
