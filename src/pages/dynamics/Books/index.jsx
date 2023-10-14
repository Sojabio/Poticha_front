import { Link } from "react-router-dom";
import dateWithoutTime from "./dateWithoutTime";
import './stylebooks.css';
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';

const Books = ({books}) => {
  return (
    <div className="books">
      <div className="library">
        {books.map((book) => (
          <Link key={book.id} to={`/ouvrages/${book.id}`} className="book-card-link">
            <div className="book-card">
              <StyledContainer>
                <img src={chatvollant} alt={`Image de ${book.title}`} />
              </StyledContainer>
              <div className="book-details">
                <h4 className="book-title">{book.title}</h4>
                <div className="book-author">
                  {book.author ? (
                    <>
                      <p className="author-name">
                        {book.author.first_name}{" "}
                        {book.author.last_name}
                      </p>
                    </>
                  ) : (
                    <p className="author-not-available">Auteurice non disponible</p>
                  )}
                </div>
                <p className="book-description">{book.description}</p>
                <p className="book-isbn">saison : {book.season}</p>
                <p className="book-release-date">Date de parution : {dateWithoutTime(book.issue_date)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Books;
