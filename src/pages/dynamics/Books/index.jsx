import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import DestroyBook from "../../../components/Admin/Books/delete";

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
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <div>
            <h4>titre : {book.title}</h4>
            <p>description : {book.description}</p>
            <p>ISBN : {book.ISBN}</p>
            <p>date de parution : </p>
            <div>
              {booksAuthors[book.id] ? (
                <>
                  <li key={booksAuthors[book.id].id}>
                    auteurice : {booksAuthors[book.id].first_name}{" "}
                    {booksAuthors[book.id].last_name}
                  </li>
                  <Link to={`/ouvrages/${book.id}`}>en savoir plus</Link>
                </>
              ) : (
                <p>Auteurice non disponible</p>
              )}
            </div>
          </div>
          {userInfo.isLoggedIn ? (
            <DestroyBook bookId={book.id} onDelete={handleBooksDeleted} />
          ) : (
            <></>
          )}
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
