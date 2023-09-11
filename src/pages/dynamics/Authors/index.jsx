import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/authors", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          setAuthors(jsonData);
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
      {authors.map((author) => (
        <div key={author.id}>
          {author.image ? (
            <img src={author.image} alt={author.first_name} />
          ) : (
            <img src="/react.svg" alt={author.first_name} className="DefaultThumbnails" />
          )}
          <div>
            <h4>
              {author.first_name} {author.last_name}
            </h4>
            <p>biographie : {author.biography}</p>
            <p>email : {author.email}</p>
              <Link to={`/auteurices/${author.id}`}>
                en savoir plus
              </Link>
          </div>
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Authors;
