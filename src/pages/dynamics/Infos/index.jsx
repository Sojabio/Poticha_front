import { Link } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import DestroyPost from "../../../components/Admin/Infos/delete";

const Infos = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo] = useAtom(userAtom);

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
            <>
            {userInfo.isLoggedIn ? (
            <DestroyPost postId={post.id} onDelete={handlePostsDeleted} />
            ) : (
              <></>
            )}
            </>
          </div>
          <p>********************</p>
        </div>
      ))}
    </div>
  );
};

export default Infos;
