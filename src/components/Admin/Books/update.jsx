import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import './style.css';

function UpdateBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ISBN, setISBN] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [season, setSeason] = useState('');
  const [pages, setPages] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const bookId = useParams().id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/books/" + bookId, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          setOriginalData(jsonData);
          setTitle(jsonData.title|| '');
          setDescription(jsonData.description|| '');
          setISBN(jsonData.ISBN|| '');
          setIssueDate(jsonData.IssueDate || '');
          setSeason(jsonData.season|| '');
          setPages(jsonData.pages|| '');
          setSelectedAuthor(jsonData.author_id|| '');
        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, []);

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
        title: title || originalData.title,
        description: description || originalData.description,
        ISBN: ISBN || originalData.ISBN,
        issue_date: issueDate || originalData.issue_date,
        season: season || originalData.season,
        pages: pages || originalData.pages,
        author_id: selectedAuthor || originalData.author_id
      }
    };

    try {
      const response = await fetch(API_URL + '/books/' + bookId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        console.log("L'ouvrage a été  modifié avec succès");
        navigate(`/ouvrages`)

      } else {
        console.error("Erreur lors de la modification de l'ouvrage");
        const responseData = await response.json();
        if (responseData.errors) {
          setErrors(responseData.errors);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'ouvrage :", error);
    }
  };

  return (
    <div className='update'>
      <div className="update-book-container">
        {errors.length > 0 && (
          <div className="error-messages">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <h2 className='update-button'>Modifier cet ouvrage</h2>
        <form className="update-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre :</label>
            <input
              placeholder={originalData.title}
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              placeholder={originalData.description}
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ISBN">ISBN :</label>
            <input
              placeholder={originalData.ISBN}
              type="text"
              id="ISBN"
              value={ISBN}
              onChange={handleISBNChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pages">Nombre de pages :</label>
            <input
              placeholder={originalData.pages}
              type="number"
              id="pages"
              value={pages}
              onChange={handlePagesChange}
              className="form-control"
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
          <div className="form-group">
            <label htmlFor="season">Saison :</label>
            <input
              placeholder={originalData.season}
              type="number"
              id="season"
              value={season}
              onChange={handleSeasonChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Auteurice :</label>
            <select
              id="author"
              value={selectedAuthor}
              onChange={handleAuthorChange}
              className="form-control"
            >
              <option value="">{originalData.author}</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Modifier</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
