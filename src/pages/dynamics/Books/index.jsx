import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [booksAuthors, setBooksAuthors] = useState({});

  useEffect(() => {
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
                throw new Error("Erreur lors de la requête des auteurices");
              }
            } catch (error) {
              console.error("Erreur de requête des auteurices : ", error);
            }
          });

          const authorsData = await Promise.all(authorFetchPromises);

          const updatedBooksAuthors = {};
          authorsData.forEach((authorInfo) => {
            updatedBooksAuthors[authorInfo.bookId] = authorInfo.author;
          });

          setBooksAuthors(updatedBooksAuthors);
        } else {
          throw new Error("Erreur lors de la requête");
        }
      } catch (error) {
        console.error("Erreur de requête : ", error);
      }
    };
    fetchData();
  }, []);

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
                {booksAuthors[book.id] && (
                  <li key={booksAuthors[book.id].id}>
                    auteurice : {booksAuthors[book.id].first_name} {booksAuthors[book.id].last_name}
                  </li>
                )}

            </div>
            <Link to={`/ouvrages/${book.id}`}>en savoir plus</Link>
          </div>
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
