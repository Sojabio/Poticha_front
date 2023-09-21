import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import Showdown from 'showdown';
import './styleposts.css';
import chatvollant from '../../../assets/chatvollant.png'


const Infos = () => {
  const [posts, setPosts] = useState([]);
  const showdownConverter = new Showdown.Converter();

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/posts", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          const reversedData = jsonData.reverse();
          setPosts(reversedData);
        } else {
          throw new Error("Erreur lors de la requête");
        }
      } catch (error) {
        console.error("Erreur de requête : ", error);
      }
    };

    useEffect(() => {
      fetchData()
    }, []);


    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
      <div className="posts">
        <div className="posts-container">
          {posts.map((post) => (
            <Link key={post.id} to={`/actus/${post.id}`} className="book-card-link">
              <div className="post-card">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="post-image" />
                ) : (
                  <img src={chatvollant} alt={`Image de chat vollant avec des ballons livres`} />
                )}
                <div className="post-details">
                  <h4 className="post-title">{post.title}</h4>
                  <div className="post-content"
                    dangerouslySetInnerHTML={{
                    __html: showdownConverter.makeHtml(post.content),
                  }}
                  />
                  <p className="post-date">{formatDate(post.created_at)}</p>
                </div>
                <hr className="divider" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Infos;
