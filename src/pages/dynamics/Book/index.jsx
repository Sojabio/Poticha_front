import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";

const Book = () => {
  const { id } = useParams();
  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');
  const [userInfo] = useAtom(userAtom);

  useEffect(() => {
    fetch(`${API_URL}/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);

        fetch(`${API_URL}/authors/${data.author_id}`)
        .then((response) => response.json())
        .then((data) => {
          setAuthor(data);
        });
      });
  }, []);

  return (
    <div>
        <div>
          <h2>titre : {book.title}</h2>
          <p> description : {book.description}</p>
          <p>ISBN : {book.ISBN}</p>
          <p> date de parution : </p>
          <p>auteurice : {author.first_name} {author.last_name}</p>
          <Link to={`/auteurices/${author.id}`}>en savoir plus sur l'auteurice</Link>
          <div>
          {userInfo.isLoggedIn ? (
            <Link to={`/updatebook/${book.id}`}>Modifier cet ouvrage</Link>
          ) : (
            <>
            </>
          ) }
          </div>
        </div>
    </div>
  );
};

export default Book;
