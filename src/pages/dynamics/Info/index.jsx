import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";
import { useAtom } from "jotai";
import { userAtom } from "../../../stores/userAtom";
import DestroyPost from "../../../components/Admin/Infos/delete";
import formatDate from "../../../components/Admin/Countdown/convertDate";
import Showdown from 'showdown';
import StyledContainer from '../../../components/ImageContainer/index.jsx';
import chatvollant from '../../../assets/chatvollant.png';

import './style.css'

const Info = () => {
  const PostId = useParams().id
  const [post, setPost] = useState('')
  const [userInfo] = useAtom(userAtom);
  const showdownConverter = new Showdown.Converter();

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
  <div className="article">
    <div className="article-container">
      <div className="article-image">
        {post.image ? (
          <img src={post.image} alt={post.title} />
        ) : (
          <StyledContainer>
          <img src={chatvollant} alt={`Chat qui vole grace a des ballons livres`} />
        </StyledContainer>
        )}
      </div>
      <div className="article-details">
        <p className="article-title"> {post.title}</p>
        <p className="article-description" dangerouslySetInnerHTML={{ __html: showdownConverter.makeHtml(post.content),}}/>
        <p>posté le {formatDate(post.created_at)}</p>
        {userInfo.isLoggedIn && (
          <div className="article-update-link">
            <Link to={`/updatepost/${post.id}`} className="update-article-link">Modifier ce post</Link>
            <DestroyPost postId={post.id} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

export default Info
