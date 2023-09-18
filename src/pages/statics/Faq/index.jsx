import React, { useState } from "react";
import './faqstyle.css'
import chatpascontent from '../../../assets/chatpascontent.png'

const Faq = () => {
  const initialQuestions = [
    {
      isOpen: false,
      question: "Le Pôticha c'est quoi?",
      answer: "Réponse à la première question."
    },
    {
      isOpen: false,
      question: "Le Pôticha c'est qui?",
      answer: "Réponse à la deuxième question."
    },
    {
      isOpen: false,
      question: "Le Pôticha c'est comment?",
      answer: "Réponse à la troisième question."
    },
    {
      isOpen: false,
      question: "Le Pôticha c'est pour qui?",
      answer: "Réponse à la quatrième question."
    }
  ];

  const [questions, setQuestions] = useState(initialQuestions);

  const toggleQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isOpen = !updatedQuestions[index].isOpen;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="FAQ">
      <h2 className="main-title">Foire aux questions</h2>
      <section className="questions-container">
        {questions.map((question, index) => (
          <div className="question" key={index}>
            <h4 onClick={() => toggleQuestion(index)}>
              {question.isOpen ? "➖" : "➕"} {question.question}
            </h4>
            {question.isOpen && (
              <p className="answer">{question.answer}</p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Faq;