import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
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
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du post:", error);
    }
  }

  return (
    <div>
      <form  encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="description"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div>
          <label htmlFor="image">image:</label>
          <input
          type="file"
          name="image"
          onChange={handleImageChange} />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default CreatePost;
