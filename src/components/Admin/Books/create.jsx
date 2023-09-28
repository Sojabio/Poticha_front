import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './stylecreatebooks.css';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ISBN, setISBN] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [season, setSeason] = useState('');
  const [pages, setPages] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [user] = useAtom(userAtom);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleISBNChange = (event) => {
    setISBN(event.target.value);
  }

  const handleIssueDateChange = (event) => {
    setIssueDate(event.target.value);
  }

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  }

  const handlePagesChange = (event) => {
    setPages(event.target.value);
  }

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBook = {
      book: {
        title: title,
        description: description,
        ISBN: ISBN,
        issue_date: issueDate,
        season: season,
        pages: pages,
        author_id: selectedAuthor,
      }
    };

    try {
      const response = await fetch(API_URL + '/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setErrors([]);
        console.log("L'ouvrage a été ajouté avec succès");
        navigate("/ouvrages")
      } else {
        console.error("Erreur lors de l'ajout de l'ouvrage");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ouvrage:", error);
    }
  }

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(API_URL + '/authors');
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        } else {
          console.error("Erreur lors de la récupération des auteurices");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des auteurices:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className='create-book'>
      <form onSubmit={handleSubmit} className='book-form'>
      {errors.length > 0 && (
        <div className="error-messages">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <h3> Ajouter un ouvrage </h3>
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
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="ISBN">ISBN :</label>
          <input
            type="text"
            id="ISBN"
            value={ISBN}
            onChange={handleISBNChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="pages">Nombre de pages :</label>
          <input
            type="number"
            id="pages"
            value={pages}
            onChange={handlePagesChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="issueDate">Date de parution :</label>
          <input
            type="datetime-local"
            id="issueDate"
            value={issueDate}
            onChange={handleIssueDateChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="season">Saison :</label>
          <input
            type="number"
            id="season"
            value={season}
            onChange={handleSeasonChange}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor="author">Auteurice :</label>
          <select
            id="author"
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className='form-control'
          >
            <option value="">Sélectionnez un-e auteurice</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className='submit-button'>
          Créer l'ouvrage
        </button>
      </form>
    </div>
  );
}

export default CreateBook;
