import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';
import dateWithoutTime from "../Books/dateWithoutTime";
import DestroyBook from "../../../components/Admin/Books/delete";
import './style.css'
// import { faBookSkull } from "@fortawesome/free-solid-svg-icons";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState('');
  const [userInfo] = useAtom(userAtom);

  useEffect(() => {
    fetch(`${API_URL}/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
      });
  }, []);

  if (!book || !book.author) {
    console.error("book or book.author is undefined:", book);
    return (
    <div className="book">
      Chargement...
    </div>
    );
  }

  return (
    <div className="book">
      <div className="article-container">
        <StyledContainer>
              <img src={chatvollant} alt={`Image de ${book.title}`} />
        </StyledContainer>
        <div className="article-details">
          <h2 className="article-title">{book.title}</h2>
          <p className="article-description">{book.description}</p>
          <p className="article-isbn">ISBN : {book.ISBN}</p>
          <p className="article-isbn">saison : {book.season}</p>
          <p className="article-isbn">date de parution : {dateWithoutTime(book.issue_date)}</p>
          <Link to={`/auteurices/${book.author.id}`} className="article-author-link">{book.author.first_name} {book.author.last_name}</Link>
          {userInfo.isLoggedIn && (
            <div className="article-update-link">
              <Link to={`/updatebook/${book.id}`} className="update-author-link">Modifier cet ouvrage</Link>
              <DestroyBook bookId={book.id} />
            </div>
          )}
        </div>
      </div>
  </div>
  );
};

export default Book;
