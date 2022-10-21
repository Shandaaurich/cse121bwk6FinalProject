// set current year in footer
const today = new Date();

const weekDay = today.toLocaleString('default', { weekday: 'long' });
const month = today.toLocaleString('default', { month: 'long' });
const day = today.toLocaleString('default', { day: 'numeric' });
const year = today.toLocaleString('default', { year: 'numeric' })


let fullDate = `${weekDay}, ${month} ${day}, ${year}`

document.querySelector('#fullDate').textContent = fullDate;
