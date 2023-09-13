import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate, useParams} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function UpdateBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ISBN, setISBN] = useState('');
  const [season, setSeason] = useState('');
  const [pages, setPages] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [user] = useAtom(userAtom);
  const [originalData, setOriginalData] = useState({});
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
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'ouvrage :", error);
    }
  };

  return (
    <div>
      <h2>Modifier cet ouvrage</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <label htmlFor="ISBN">ISBN:</label>
          <input
            type="text"
            id="ISBN"
            value={ISBN}
            onChange={handleISBNChange}
          />
        </div>
        <div>
          <label htmlFor="pages">Nombre de pages:</label>
          <input
            type="number"
            id="pages"
            value={pages}
            onChange={handlePagesChange}
          />
        </div>
        <div>
          <label htmlFor="season">Season:</label>
          <input
            type="number"
            id="season"
            value={season}
            onChange={handleSeasonChange}
          />
        </div>
        <div>
          <label htmlFor="author">Auteur :</label>
          <select
            id="author"
            value={selectedAuthor}
            onChange={handleAuthorChange}
          >
            <option value="">{originalData.author}</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default UpdateBook;
