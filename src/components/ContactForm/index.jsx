import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../stores/apiUrl";

import './style.css'

export const ContactForm = ({authormail}) => {
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
        recipientEmail: authormail,
      };
      newMessage(formData);
      setMessage(defaultFields);
      console.log(authormail)
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && (
            <div>
              <p><strong>Votre message n'a pas pu être envoyé car vous avez oublié de remplir le(s) champ(s) suivant(s) :</strong></p>
              <ul>
                {Object.keys(errors).map((field, index) => (
                  <li key={index}>{`${fieldNamesInFrench[field]} ${errors[field]}`}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
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
                />
              </div>
            </label>
          </div>
          <div>
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
                />
              </div>
            </label>
          </div>
          <div>
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
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              Message:
              <div>
                <textarea
                  placeholder="Message"
                  name="message"
                  id="message"
                  onChange={handleChange}
                  value={message.message}
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
              <button>Envoyer</button>
            </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
