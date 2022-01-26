export const dateEl = document.querySelector('.date');

const setDate = function () {
  const now = new Date();
  const options = {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const date = Intl.DateTimeFormat([], options).format(now);
  return date;
};

setInterval(() => {
  dateEl.textContent = '';
  dateEl.textContent = setDate();
});
