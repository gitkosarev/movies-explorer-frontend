export const getFormattedDuration = (value) => {
  if (isNaN(value) || value < 0) {
    return "Некорректное значение";
  } else {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}ч${minutes}м`;
  }
};