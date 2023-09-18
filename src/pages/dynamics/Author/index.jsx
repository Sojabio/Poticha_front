import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';

import './style.css';

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
    <div className="author">
      <div className="article-container">
        <div className="article-image">
          {author.image ? (
            <img src={author.image} alt={author.first_name} />
          ) : (
            <StyledContainer>
              <img src={chatvollant} alt={`Chat qui vole grace a des ballons livres`} />
            </StyledContainer>
          )}
        </div>
        <div className="article-details">
          <h2 className="article-title">
            {author.first_name} {author.last_name}
          </h2>
          <p className="article-description">Biographie : {author.biography}</p>
          <p className="article-email">Email : {author.email}</p>
          <a className="article-email" href={`mailto:${author.email}`}>contacter {author.first_name} {author.last_name}
          </a>
          <div>
          <Link to={`/auteurices/${author.id}/contact`}>Formulaire de contact</Link>
          </div>
          <div className="article-books">
            Ouvrages publiés chez LePôticha :
            <ul>
              {books.map((book) => (
                <li key={book.id}>
                  <Link to={`/ouvrages/${book.id}`} className="article-book-link">
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {userInfo.isLoggedIn ? (
            <Link to={`/updateauthor/${author.id}`} className="update-author-link">
              Modifier cet-te auteurice
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

  export default Author;
