import React from 'react';
import CountdownTimer from './CountdownTimer';
import { useState, useEffect } from 'react';
import { API_URL } from '../../stores/apiUrl';

const Countdown = () => {
  const [countdownInfo, setCountdownInfo] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL + "/countdowns", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setCountdownInfo(jsonData[0]);
        setTargetDate(jsonData[0].end_date)
        setIsOpen(jsonData[0].is_open)
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

  return (
    <div>
      {isOpen === true ? (
        <div>Plus que
        <CountdownTimer targetDate={targetDate} />
        avant la fermeture des abonnements </div>
      ) : (
        <>
          Les abonnements sont fermés, RDV à la saison prochaine
        </>
      )}
    </div>
  );
}

export default Countdown
