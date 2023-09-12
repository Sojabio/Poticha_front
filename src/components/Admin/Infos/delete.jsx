import { useAtom } from 'jotai'
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

const DestroyPost = ({postId, onDelete}) => {
  const [user] = useAtom(userAtom);
  const PostId = postId

  const handleDestroy = async () => {
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
        onDelete();
      } else {
        console.log('Failed to delete post');
      }
    } catch (error) {
      console.error('An error occurred while deleting post:', error);
    }
  }


  return (
    <button onClick={handleDestroy}>Supprimer ce post</button>
  )
}

export default DestroyPost
