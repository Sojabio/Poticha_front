import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl";

import ContactForm from "../../../components/ContactForm"
import './style.css'

const contactAuthor = () => {

  const { id } = useParams();
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/authors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
        console.log(data)
      });
  }, []);


  return (
    <div className="author">
    <ContactForm authorid={author.id} authorFirstName={author.first_name} authorLastName={author.last_name} />
    </div>
  )
}

export default contactAuthor
