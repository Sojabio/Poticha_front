import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      {value} {type}
    </div>
  );
};

export default DateTimeDisplay;
