import React from 'react';
import './style.css'

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown-data danger' : 'countdown-data'}>
      {value} {type}
    </div>
  );
};

export default DateTimeDisplay;
