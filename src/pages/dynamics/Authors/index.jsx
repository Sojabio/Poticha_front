import { Link } from "react-router-dom";
import './styleauthors.css';
import chatvollant from '../../../assets/chatvollant.png'
import StyledContainer from '../../../components/ImageContainer/index.jsx';

const Authors = ({authors}) => {

  return (
    <div className="authors">
      <div className="authors-container">
        {authors.map((author) => (
          <Link key={author.id} to={`/auteurices/${author.id}`} className="author-card-link">
            <div className="author-card">
              {author.image ? (
                <StyledContainer>
                  <img src={author.image} alt={author.first_name} className="author-image" />
                </StyledContainer>
              ) : (
                <StyledContainer>
                  <img src={chatvollant} alt={`Chat qui vole grace a des ballons livres`} />
                </StyledContainer>
              )}
              <div className="author-details">
                <h4 className="author-name">
                  {author.first_name} {author.last_name}
                </h4>
                <p className="author-biography">{author.biography}</p>
              </div>
              {author.books && author.books.length > 0 && (
                <div className="author-books">
                  {author.books.length === 1 ? (
                    <p> Publication chez Le Pôticha </p>
                  ) : (
                  <p>Publications chez Le Pôticha :</p>
                  )}
                  <ul>
                    {author.books.map((book) => (
                      <li key={book.id} className="book-title">{book.title}</li>
                    ))}
                  </ul>
                </div>
              )}
              <hr className="divider" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Authors;
