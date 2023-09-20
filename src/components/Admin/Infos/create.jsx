import { useState } from 'react';
import { useAtom } from 'jotai';
import DisplayContent from './displayContent';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import './stylecreatepost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
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
      const response = await fetch(API_URL + '/posts', {
        method: 'POST',
        headers: {
          Authorization: `${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Le post a été ajouté avec succès');
        navigate("/actus")
      } else {
        console.error("Erreur lors de l'ajout du post");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du post:", error);
    }
  }

  return (
    <div className='create-post'>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className='post-form'>
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <h3> Ajouter un post</h3>
        <div className='form-group'>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className='form-control'
          />
        </div>
        <div>
            <DisplayContent content={content} />
        </div>
        <div className='form-group'>
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className='form-control-file'
          />
        </div>
        <button type="submit" className='submit-button'>Ajouter</button>
      </form>
    </div>
  );
}

export default CreatePost;
