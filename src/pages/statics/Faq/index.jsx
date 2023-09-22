import React, { useState } from "react";
import './faqstyle.css'
import chatpascontent from '../../../assets/chatpascontent.png'

const Faq = () => {
  const initialQuestions = [
    {
      isOpen: false,
      question: "Le Pôticha c'est quoi ?",
      answer: "Le Pôticha est une maison d'édition pour le théâtre. Elle se donne pour mission de publier les œuvres puissantes et non-oppressives qui vont construire le monde libéré que nous espérons. Notre maison se veut également la moins précarisante possible pour celleux qui créent la valeur des livres."
    },
    {
      isOpen: false,
      question: "Les petits formats du Pôticha, c'est quoi ?",
      answer: "Les petits formats c'est  un texte de théâtre bref et inédit tous les mois dans ta boîte aux lettres grâce à l'abonnement de 6 ou 9 mois."
    },
    {
      isOpen: false,
      question: "Et les grands formats, c'est quand ? ",
      answer: "L'objectif pour les grands formats, c'est un texte publié tous les ans sous format A5 et disponible sur le site et dans les libraires partenaires."
    },
    {
      isOpen: false,
      question: "L'adhésion, pourquoi ?",
      answer: "Le Pôticha est une association ayant pour de faire découvrir des textes d'auteurices vivantes et participer à leur juste rémunération. Adhérer au Pôticha c'est nous montrer votre soutien et nous permettre de travailler dans les meilleures temporalité et avec les meilleurs matériaux et partenaires. "
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
