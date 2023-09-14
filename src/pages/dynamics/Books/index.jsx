import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import DestroyBook from "../../../components/Admin/Books/delete";
import './style.css';
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';



const Books = () => {
  const [books, setBooks] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState({});
  const [userInfo] = useAtom(userAtom);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/books", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setBooks(jsonData);

        const authorFetchPromises = jsonData.map(async (book) => {
          try {
            const authorsResponse = await fetch(
              `${API_URL}/authors/${book.author_id}`,
              {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (authorsResponse.ok) {
              const authorData = await authorsResponse.json();
              return { bookId: book.id, author: authorData };
            } else {
              return { bookId: book.id, author: null };
            }
          } catch (error) {
            console.error("Erreur de requête des auteurices : ", error);
            return { bookId: book.id, author: null };
          }
        });

        const authorsData = await Promise.all(authorFetchPromises);

        const updatedBooksAuthors = {};
        authorsData.forEach((authorInfo) => {
          if (authorInfo) {
            updatedBooksAuthors[authorInfo.bookId] = authorInfo.author;
          }
        });

        setBooksAuthors(updatedBooksAuthors);
      } else {
        throw new Error("Erreur lors de la requête");
      }
    } catch (error) {
      console.error("Erreur de requête : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooksDeleted = async () => {
    await fetchData();
  };

  return (
    <div className="library">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <StyledContainer>
            <img src={chatvollant} alt={`Image de ${book.title}`} />
          </StyledContainer>
          <div className="book-details">
            <h4 className="book-title">{book.title}</h4>
            <p className="book-description">{book.description}</p>
            <p className="book-isbn">ISBN : {book.ISBN}</p>
            <p className="book-release-date">Date de parution : {book.release_date}</p>
            <div className="book-author">
              {booksAuthors[book.id] ? (
                <>
                  <p className="author-name">
                    {booksAuthors[book.id].first_name}{" "}
                    {booksAuthors[book.id].last_name}
                  </p>
                </>
              ) : (
                <p className="author-not-available">Auteurice non disponible</p>
              )}
            </div>
          </div>
          {userInfo.isLoggedIn ? (
            <DestroyBook bookId={book.id} onDelete={handleBooksDeleted} />
          ) : (
            <></>
          )}
          <Link to={`/ouvrages/${book.id}`} className="learn-more-link">En savoir plus</Link>
        </div>
      ))}
    </div>
  );
};

export default Books;