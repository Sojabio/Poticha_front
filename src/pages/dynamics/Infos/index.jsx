import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";

const Infos = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
          setPosts(jsonData);
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
      {posts.map((post) => (
        <div key={post.id}>
          <div>
            <h4>
              {post.title}
            </h4>
            <p>{post.content}</p>
            <p>posté le {post.created_at}</p>
            <Link to={`/actus/${post.id}`}>en savoir plus</Link>
          </div>
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Infos;
