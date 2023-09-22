import { useState, useEffect } from 'react';
import './abostyle.css';
import Countdown from '../../../components/Countdown/Countdown';
import { API_URL } from '../../../stores/apiUrl';

const Abo = () => {
  const [countdownStatus, setCountdownStatus] = useState(false);

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
        setCountdownStatus(jsonData[0].is_open);
      } else {
        throw new Error("Erreur lors de la requête");
      }
    } catch (error) {
      console.error("Erreur de requête : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="center-abo" >
      <div className="countdown-abo">
      <Countdown/>
      </div>
        {countdownStatus === true && (
          <iframe
          className="helloasso"
          id="haWidget"
          allowtransparency="true"
          scrolling="auto"
          src="https://www.helloasso.com/associations/le-poticha/adhesions/le-poticha-adherents-2023-2024/widget"
          style={{ width: '80%', height: '83vh', border: 'none',overflow:'auto' ,  marginLeft:'74px', marginTop:'30px' }}>
          </iframe>
         )}
    </div>
  )
}

export default Abo
