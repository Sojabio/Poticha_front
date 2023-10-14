import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../stores/apiUrl";

import './style.css'

export const ContactForm = ({authorid, authorFirstName, authorLastName}) => {
  let defaultFields = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [message, setMessage] = useState(defaultFields);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const newMessage = (formData) => {
    fetch(API_URL + "/contacts", {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error('Erreur lors de la requête');
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.sent) {
          setSuccess(true);
          navigate('/mailsuccess')
        } else {
          setSuccess(false);
        }
      })
      .catch((error) => console.error('Erreur de requête : ', error));
  };

  const handleChange = (event) => {
    setMessage({
      ...message,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const validForSubmission = () => {
    let submitErrors = {};
    const requiredFields = ["name", "email", "subject", "message"];
    requiredFields.forEach((field) => {
      if (message[field].trim() === "") {
        submitErrors[field] = "";
      }
    });
    setErrors(submitErrors);
    return Object.keys(submitErrors).length === 0;
  };

  const fieldNamesInFrench = {
    name: "Nom",
    email: "Email",
    subject: "Objet",
    message: "Message",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message && message.phone && message.phone.trim() !== "") {
      console.log("Bot detected!");
      return;
    }

    if (validForSubmission()) {
        const formData = {
        ...message,
        recipientId: authorid,
      };
      newMessage(formData);
      setMessage(defaultFields);
      console.log(authorid)
    }
  };

  return (
      <div className='contact-author-container'>
        <form onSubmit={handleSubmit} className='contact-author-form'>
          {Object.keys(errors).length > 0 && (
            <div className="error-messages">
              <p><strong>Votre message n'a pas pu être envoyé car vous avez oublié de remplir le(s) champ(s) suivant(s) :</strong></p>
              <ul>
                {Object.keys(errors).map((field, index) => (
                  <li key={index}>{`${fieldNamesInFrench[field]} ${errors[field]}`}</li>
                ))}
              </ul>
            </div>
          )}
          { authorFirstName && authorLastName ? (
            <h3> Contacter {authorFirstName} {authorLastName}</h3>
          ) : (
            <h3> Nous contacter </h3>
          )}
          <div className='form-group'>
            <label>
              Nom:
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={message.name}
                  className='form-control'
                />
              </div>
            </label>
          </div>
          <div className='form-group'>
            <label>
              Email:
              <div>
                <input
                  type="text"
                  placeholder="adresse email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={message.email}
                  className='form-control'
                />
              </div>
            </label>
          </div>
          <div className='form-group'>
            <label>
              Objet:
              <div>
                <input
                  type="text"
                  placeholder="Objet du message"
                  name="subject"
                  id="subject"
                  onChange={handleChange}
                  value={message.subject}
                  className='form-control'
                />
              </div>
            </label>
          </div>
          <div className='form-group'>
            <label>
              Message:
              <div>
                <textarea
                  placeholder="Message"
                  name="message"
                  id="message"
                  onChange={handleChange}
                  value={message.message}
                  className='form-control'
                ></textarea>
              </div>
            </label>
          </div>
          <div>
            <label className="ohnohoney" htmlFor="phone"></label>
            <input
              className="ohnohoney"
              autoComplete="off"
              type="text"
              id="phone"
              name="phone"
              placeholder="Your phone here"/>
            </div>
            <div>
              <button type="submit" className="submit-button">Envoyer</button>
            </div>
        </form>
      </div>
  );
};

export default ContactForm;
