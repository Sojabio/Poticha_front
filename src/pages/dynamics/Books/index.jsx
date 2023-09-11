import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);

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
            <h4>
              {book.title}
            </h4>
            <p>description : {book.description}</p>
            <p>ISBN : {book.ISBN}</p>
            

          </div>
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Books;
