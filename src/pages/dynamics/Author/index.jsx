import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';
import DestroyAuthor from "../../../components/Admin/Authors/delete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBook} from '@fortawesome/free-solid-svg-icons';

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
          <div className="article-title">
            {author.first_name} {author.last_name}
            <Link to={`/auteurices/${author.id}/contact`} className="contact-link">
            <FontAwesomeIcon icon={faEnvelope} alt={`contacter ${author.first_name} ${author.last_name}`} />
            </Link>
          </div>
          <p className="article-description">{author.biography}</p>
          <div className="article-books">
            {books.length === 1 ? (
              <p> Publication chez Le Pôticha : </p>
            ) : (
              <p> Publications chez Le Pôticha : </p>
            )}
            <ul>
              {books.map((book) => (
                <li key={book.id} className="book-title">
                  <Link to={`/ouvrages/${book.id}`} className="article-book-link">
                    {book.title}
                    <FontAwesomeIcon icon={faBook} alt={`en savoir plus sur ${book.title}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
          </div>
          {userInfo.isLoggedIn ? (
            <>
            <Link to={`/updateauthor/${author.id}`} className="update-author-link">
              Modifier l'auteurice
            </Link>
            <DestroyAuthor authorId={author.id}/>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

  export default Author;
