import { useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function CreateBook() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ISBN, setISBN] = useState('');
  const [season, setSeason] = useState('');
  const [pages, setPages] = useState('');
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [user] = useAtom(userAtom);
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
        console.log("L'ouvrage a été ajouté avec succès");
        navigate("/ouvrages")
      } else {
        console.error("Erreur lors de l'ajout de l'ouvrage");
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
    <div>
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="season">Saison:</label>
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
            <option value="">Sélectionnez un-e auteurice</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.first_name} {author.last_name}
              </option>
            ))}
          </select>
        </div>

      <button type="submit">Créer l'ouvrage</button>
    </form>
  </div>
  );
}

export default CreateBook;
