import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";

const Info = () => {
  const PostId = useParams().id
  const [post, setPost] = useState('')
  const [userInfo] = useAtom(userAtom);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/posts/" + PostId, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const jsonData = await response.json();
        setPost(jsonData);

      } else {
        throw new Error('Erreur lors de la requête');
      }
    } catch (error) {
      console.error('Erreur de requête : ', error)
    }
  };
  fetchData()
}, []);



return (
  <div>
    <p> {post.title}</p>
    <p>{post.content}</p>
    <p>posté le {post.created_at}</p>
    <>
    {userInfo.isLoggedIn ? (
    <Link to={`/updatepost/${post.id}`}>Modifier ce post</Link>
    ) : (
      <>
      </>
    ) }
    </>
  </div>
)
}

export default Info
