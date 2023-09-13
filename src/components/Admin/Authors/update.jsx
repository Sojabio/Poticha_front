import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function UpdateAuthor() {
  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [biography, setBiography] = useState(undefined);
  const [image, setImage] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState([])
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
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'auteurice :", error);
    }
  };

  return (
    <div>
      <h2>Modifier cette auteurice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Prénom :</label>
          <input
            placeholder={originalData.first_name}
            type="text"
            id="firstName"
            value={firstName || originalData.first_name}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Nom :</label>
          <input
            placeholder={originalData.last_name}
            type="text"
            id="lastName"
            value={lastName || originalData.last_name}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="biography">Biography :</label>
          <textarea
            placeholder={originalData.biography}
            id="biography"
            value={biography || originalData.biography}
            onChange={handleBiographyChange}
          />
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
  );
}

export default UpdateAuthor;
