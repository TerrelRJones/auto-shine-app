const date = new Date();

const month = ["Jan", "Feb", "March"];

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dateData = [
  {
    id: 0,
    title: day[date.getDay()],
    day: `${date.getDate()} ${month[date.getMonth()]}`,
  },
  {
    id: 1,
    title: day[date.getDay() + 1],
    day: `${date.getDate() + 1} ${month[date.getMonth()]}`,
  },
  {
    id: 2,
    title: day[date.getDay() + 2],
    day: `${date.getDate() + 2} ${month[date.getMonth()]}`,
  },
  {
    id: 3,
    title: day[date.getDay() + 3],
    day: `${date.getDate() + 3} ${month[date.getMonth()]}`,
  },
  {
    id: 4,
    title: day[date.getDay() + 4],
    day: `${date.getDate() + 4} ${month[date.getMonth()]}`,
  },
  {
    id: 5,
    title: day[date.getDay() + 5],
    day: `${date.getDate() + 5} ${month[date.getMonth()]}`,
  },
  {
    id: 6,
    title: day[date.getDay() + 6],
    day: `${date.getDate() + 6} ${month[date.getMonth()]}`,
  },
];
