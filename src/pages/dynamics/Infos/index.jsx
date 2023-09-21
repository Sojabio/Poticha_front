import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import Showdown from 'showdown';
import DestroyPost from "../../../components/Admin/Infos/delete";
import './styleposts.css';
import chatvollant from '../../../assets/chatvollant.png'


const Infos = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo] = useAtom(userAtom);
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

    const handlePostsDeleted = async () => {

      await fetchData();
    };

    const formatDate = (dateString) => {
      const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
      <div className="posts">
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
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
                <Link to={`/actus/${post.id}`} className="learn-more-link">En savoir plus</Link>
                {userInfo.isLoggedIn && (
                  <DestroyPost postId={post.id} onDelete={handlePostsDeleted} />
                )}
              </div>
              <hr className="divider" />
            </div>
          ))}
        </div>
      </div>
    );

};

export default Infos;
