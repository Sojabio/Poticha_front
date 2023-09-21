import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';
import formatDate from './convertDate';
import Form from 'react-bootstrap/Form';
import './countdownformstyle.css';

function UpdateCountdown() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [originalData, setOriginalData] = useState({});
  const [user] = useAtom(userAtom);
  const [formSubmitted, setFormSubmitted] = useState('');
  const [countDownId, setCountDownId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL + "/countdowns/", {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const jsonData = await response.json();
          const data = jsonData[0];
          setOriginalData(data);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          setIsOpen(data.is_open);
          setCountDownId(data.id)

        } else {
          throw new Error('Erreur lors de la requête');
        }
      } catch (error) {
        console.error('Erreur de requête : ', error)
      }
    };
    fetchData()
  }, []);

  useEffect(() => {
    console.log('originalisOpen:', isOpen);
  }, [isOpen]);

  function handleStartDateChange(event) {
    setStartDate(event.target.value);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  function handleIsOpenChange() {
    handleSubmit();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }


  const handleSubmit = async () => {
    setFormSubmitted(true);

    const newCountdown = {
      countdown: {
        start_date: startDate || originalData.start_date,
        end_date: endDate || originalData.end_date,
        is_open: !isOpen,
      }
    };

    try {
      const response = await fetch(API_URL + '/countdowns/' + countDownId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newCountdown),
      });

      if (response.ok) {
        console.log('Le compteur a été initialisé avec succès');
        console.log(`état du compteur: ${isOpen}`)
      } else {
        console.error("Erreur lors de l'initialisation du compteur'");
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation du compteur' :", error);
    }
  };

  return (
    <div className='countdown-form'>
      <h3> Paramétrer le décompte</h3>
      <form onSubmit={handleSubmit}>
        {!isOpen ? (
          <>
          <div className='form-group'>
            <label htmlFor="startDate">date de début : </label>
            <input
              type="datetime-local"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className='form-group'>
          <label htmlFor="endDate">date de fin : </label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        </>
        ) : (
          <>
          <p>Le décompte est activé du {formatDate(startDate)} au {formatDate(endDate)}</p>
          </>
        )}
          <Form.Check
            type="switch"
            id="toggle-switch"
            label={isOpen ? "Désactiver" : "Activer"}
            checked={isOpen}
            onChange={handleIsOpenChange}
          />
        {/* <button type="submit">Confirmer</button> */}
      </form>
    </div>
  );
}

export default UpdateCountdown;
