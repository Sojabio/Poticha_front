import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import './stylecreateauthors.css';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function CreateAuthor() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleBiographyChange = (event) => {
    setBiography(event.target.value);
  }

  const handleImageChange = event => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
      formData.append('author[first_name]', firstName);
      formData.append('author[last_name]', lastName);
      formData.append('author[biography]', biography);
      formData.append('author[email]', email);
      formData.append('image', image);

    try {
      const response = await fetch(API_URL + '/authors', {
        method: 'POST',
        headers: {
          Authorization: `${user.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("L'auteurice a été ajouté-e avec succès");
        navigate("/auteurices")
      } else {
        console.error("Erreur lors de l'ajout de l'auteurice");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'auteurice:", error);
    }
  }

  return (
    <div className='create-author'>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className='author-form'>
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <h3>Ajouter un-e auteurice</h3>
        <div className='form-group'>
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="biography">Biographie :</label>
          <textarea
            id="biography"
            value={biography}
            onChange={handleBiographyChange}
            className='form-control'
          />
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

export default CreateAuthor;
