import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../stores/apiUrl"; // Assuming API_URL is defined in this file

export const ContactForm = () => {
  let defaultFields = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [message, setMessage] = useState(defaultFields);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  if (successMessage && navigate) {
    console.log("message envoyé avec succès");
    navigate('');
  }

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
          let errorMessage = `${response.status} (${response.statusText})`;
          let error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.sent) {
          setSuccessMessage(true);
          navigate('/')
        } else {
          setSuccessMessage(false);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
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
        submitErrors[field] = "is blank";
      }
    });
    setErrors(submitErrors);
    return Object.keys(submitErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validForSubmission()) {
      newMessage(message);
      setMessage(defaultFields);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <form onSubmit={handleSubmit} className="new-post-form callout">
          {Object.keys(errors).length > 0 && (
            <div className="notification is-danger">
              <p><strong>Please fix the following errors:</strong></p>
              <ul>
                {Object.keys(errors).map((field, index) => (
                  <li key={index}>{`${field} ${errors[field]}`}</li>
                ))}
              </ul>
            </div>
          )}

<div className="field">
            <label className="label">
              Name:
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Please enter your name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={message.name}
                />
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              Email:
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Please enter your email address"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={message.email}
                />
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              Subject:
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Please add a message subject"
                  name="subject"
                  id="subject"
                  onChange={handleChange}
                  value={message.subject}
                />
              </div>
            </label>
          </div>

          <div className="field">
            <label className="label">
              Message:
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Add your message here"
                  name="message"
                  id="message"
                  onChange={handleChange}
                  value={message.message}
                ></textarea>
              </div>
            </label>
          </div>


          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </form>
        {successMessage === false && (
          <div className="blog-flex">
            <p>Sorry, your message couldn't be sent. Please try again and make sure all fields are filled out.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
