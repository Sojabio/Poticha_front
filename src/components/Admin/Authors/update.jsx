import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function UpdateAuthor() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [biography, setBiography] = useState('');
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const authorId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/authors/" + authorId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setOriginalData(jsonData);
          setFirstName(jsonData.first_name|| '');
          setLastName(jsonData.last_name|| '');
          setBiography(jsonData.biography|| '');
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
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

    const newAuthor = {
      author: {
        first_name: firstName || originalData.first_name,
        last_name: lastName || originalData.last_name,
        biography: biography || originalData.biography,
        image: image || originalData.image,
      }
    };

    try {
      const response = await fetch(API_URL + '/authors/' + authorId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        console.log("L'auteurice a été  modifié-e avec succès");
        navigate(`/auteurices/${authorId}`)

      } else {
        console.error("Erreur lors de la modification de l'auteurice");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'auteurice :", error);
    }
  };

  return (
    <div className="update">
      <div className="update-author-container">
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
        <h2 className="update-button">Modifier cette auteurice</h2>
        <form className="update-author-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Prénom :</label>
            <input
              placeholder={originalData.first_name}
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom :</label>
            <input
              placeholder={originalData.last_name}
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="biography">Biography :</label>
            <textarea
              placeholder={originalData.biography}
              id="biography"
              value={biography}
              onChange={handleBiographyChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="form-control">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAuthor;
