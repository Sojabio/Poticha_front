import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useNavigate} from 'react-router-dom';
import { userAtom } from '../../../stores/userAtom';
import { API_URL } from '../../../stores/apiUrl';

function setCountdown() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [user] = useAtom(userAtom);

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
          setStartDate(data.start_date || '');
          setEndDate(data.end_date || '');
          setIsOpen(data.is_open || false);
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

    console.log(originalData);
    console.log(isOpen)
  }, [originalData]);

  function handleStartDateChange(event) {
    setStartDate(event.target.value);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  function handleIsOpenChange() {
    setIsOpen((prev) => !prev)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCountdown = {
      countdown: {
        start_date: startDate || originalData.start_date,
        end_date: endDate || originalData.end_date,
        is_open: isOpen || originalData.is_open,
      }
    };

    try {
      const response = await fetch(API_URL + '/countdowns/4', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user.token}`,
        },
        body: JSON.stringify(newCountdown),
      });

      if (response.ok) {
        console.log('Le compteur a été initialisé avec succès');


      } else {
        console.error("Erreur lors de l'initialisation du compteur'");
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation du compteur' :", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start_date">date de début:</label>
          <input
            type="datetime-local"
            id="startDate"
            value={startDate || originalData.start_date}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="end_date">date de fin:</label>
          <input
            type="datetime-local"
            id="endDate"
            value={endDate || originalData.end_date}
            onChange={handleEndDateChange}
          />
        </div>
        <div>
          <button type="button" onClick={handleIsOpenChange}>
            {isOpen ? "Désactiver" : "Activer"}
          </button>
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default setCountdown;
