import React from 'react';
import CountdownTimer from './CountdownTimer';
import { useState, useEffect } from 'react';
import { API_URL } from '../../stores/apiUrl';

import './style.css'


const Countdown = () => {
  const [countdownInfo, setCountdownInfo] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()

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
        setStartDate(new Date(jsonData[0].start_date))
        setEndDate(new Date(jsonData[0].end_date))

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

  const isCountdownOpen = isOpen && endDate > today && startDate <= today;

  return (
    <div>
      {isCountdownOpen? (
        <>
        <div className="countdown-open">
        <CountdownTimer targetDate={targetDate}/>
        </div>
        <p className="countdown-subtitle">avant la fermeture des abonnements</p>
        <button href="#" className='cta-button'>S'abonner</button>
        </>

      ) : (
        <>
        <div className="countdown-closed">
          Les abonnements sont fermés :(
        </div>
        <button href="#" className='cta-button'> En savoir plus</button>
        </>
      )}
    </div>
  );

}

export default Countdown
