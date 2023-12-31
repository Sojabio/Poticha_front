function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  // Get day, month, year, hours, and minutes
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Format the date and time
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default formatDate
