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
    day: `${month[date.getMonth()]} ${date.getDate()}`,
  },
  {
    id: 1,
    title: day[date.getDay() + 1],
    day: `${month[date.getMonth()]} ${date.getDate() + 1} `,
  },
  {
    id: 2,
    title: day[date.getDay() + 2],
    day: `${month[date.getMonth()]} ${date.getDate() + 2} `,
  },
  {
    id: 3,
    title: day[date.getDay() + 3],
    day: `${month[date.getMonth()]} ${date.getDate() + 3} `,
  },
  {
    id: 4,
    title: day[date.getDay() + 4],
    day: `${month[date.getMonth()]} ${date.getDate() + 4} `,
  },
  {
    id: 5,
    title: day[date.getDay() + 5],
    day: `${month[date.getMonth()]} ${date.getDate() + 5} `,
  },
  {
    id: 6,
    title: day[date.getDay() + 6],
    day: `${month[date.getMonth()]} ${date.getDate() + 6} `,
  },
];
