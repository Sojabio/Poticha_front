import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/authors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
      });

    fetch(`${API_URL}/books?author_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  return (
    <div>
        <div>
          <h2>{author.first_name} {author.last_name}</h2>
          <p>Biograpie: {author.biography}</p>
          <p>Email: {author.email}</p>
          <div>
            Ouvrages publiés chez LePôticha :
            {books.map((book) => (
              <p key={book.id}>{book.title}</p>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Author;
