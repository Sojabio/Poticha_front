function dateWithoutTime(isoDateString) {
  const date = new Date(isoDateString);

  // Get day, month, year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Format the date and time
  return `${day}/${month}/${year}`;
}

export default dateWithoutTime
