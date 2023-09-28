import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

import './style.css'

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
        <DateTimeDisplay value={days} type={'Jours'} isDanger={days <= 3} />
        <DateTimeDisplay value={hours} type={'Heures'} isDanger={days <= 3} />
        <DateTimeDisplay value={minutes} type={'Minutes'} isDanger={days <= 3} />
        <DateTimeDisplay value={seconds} type={'Secondes'} isDanger={days <= 3} />
    </div>
  );
};


const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );

};

export default CountdownTimer;
