import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import DisplayContent from './displayContent';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState([])
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const postId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/posts/" + postId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setOriginalData(jsonData);
          setTitle(jsonData.title || '');
          setContent(jsonData.content|| '');
        } else {
          console.error('Erreur lors de la requête');
          const responseData = await response.json();
          if (responseData.errors) {
          setErrors(responseData.errors);
        }
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, []);

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = event => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
      formData.append('post[title]', title);
      formData.append('post[content]', content);
      formData.append('image', image);

    try {
      const response = await fetch(API_URL + '/posts/' + postId, {
        method: 'PATCH',
        headers: {
          Authorization: `${user.token}`,
        },
        body:  formData,
      });

      if (response.ok) {
        console.log('Le post a été  modifié avec succès');
        navigate(`/actus/${postId}`)

      } else {
        console.error("Erreur lors de la modification du post");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification du post :", error);
    }
  };

  return (
    <div className='update'>
      <div className="update-post-container">
        {errors.length > 0 && (
          <div className="error-messages">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <h2>Modifier ce post</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Titre :</label>
            <input
              placeholder={originalData.title}
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Contenu :</label>
            <textarea
              placeholder={originalData.content}
              id="description"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <div>
            <DisplayContent content={content} />
          </div>
          <div>
            <label htmlFor="image">image:</label>
            <input
            type="file"
            name="image"
            onChange={handleImageChange} />
          </div>
          <button type="submit">Modifier</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
