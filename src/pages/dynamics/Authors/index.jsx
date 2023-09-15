import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import DestroyAuthor from "../../../components/Admin/Authors/delete";
import './styleauthors.css';
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';



const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [authorBooks, setAuthorBooks] = useState({});
  const [userInfo] = useAtom(userAtom);

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/authors", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.reverse();
          setAuthors(reversedData);

          const bookPromises = jsonData.map(async (author) => {
            try {
              const booksResponse = await fetch(
                `${API_URL}/books?author_id=${author.id}`,
                {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (booksResponse.ok) {
                const booksData = await booksResponse.json();
                return { authorId: author.id, books: booksData };
              } else {
                throw new Error("Erreur lors de la requête des livres");
              }
            } catch (error) {
              console.error("Erreur de requête des livres : ", error);
              return { authorId: author.id, books: [] };
            }
          });

          const bookResults = await Promise.all(bookPromises);

          const updatedAuthorBooks = {};
          bookResults.forEach(({ authorId, books }) => {
            updatedAuthorBooks[authorId] = books;
          });

          setAuthorBooks(updatedAuthorBooks);
        } else {
          throw new Error("Erreur lors de la requête");
        }
      } catch (error) {
        console.error("Erreur de requête : ", error);
      }
    };


    useEffect(() => {
      fetchData()
    }, []);

  const handleAuthorsDeleted = async () => {
    await fetchData();
  };

  return (
    <div className="authors">
      <div className="authors-container">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            {author.image ? (
              <StyledContainer>
                <img src={author.image} alt={author.first_name} className="author-image" />
              </StyledContainer>          
              ) : (
              <StyledContainer>
                <img src={chatvollant} alt={`Chat qui vole grace a des ballons livres`} />
              </StyledContainer>
            )}
            <div className="author-details">
              <h4 className="author-name">
                {author.first_name} {author.last_name}
              </h4>
              <p className="author-biography">Biographie : {author.biography}</p>
              <p className="author-email">Email : {author.email}</p>
              <Link to={`/auteurices/${author.id}`} className="learn-more-link">En savoir plus</Link>
            </div>
            {authorBooks[author.id] && authorBooks[author.id].length > 0 && (
              <div className="author-books">
                <p>Ouvrages parus chez Le Pôticha :</p>
                <ul>
                  {authorBooks[author.id].map((book) => (
                    <li key={book.id} className="book-title">{book.title}</li>
                  ))}
                </ul>
                {userInfo.isLoggedIn ? (
                  <DestroyAuthor authorId={author.id} onDelete={handleAuthorsDeleted} />
                ) : (
                <></>
              )}
              </div>
            )}
            <hr className="divider" />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Authors;
