import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);
  const [userInfo] = useAtom(userAtom);

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
          <p>Biographie: {author.biography}</p>
          <p>Email: {author.email}</p>
          <div>
            Ouvrages publiés chez LePôticha :
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <Link to={`/ouvrages/${book.id}`}>{book.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          {userInfo.isLoggedIn ? (
            <Link to={`/updateauthor/${author.id}`}>Modifier ce-tte auteurice</Link>
          ) : (
            <>
            </>
          ) }
        </div>
    </div>
  );
};

export default Author;
