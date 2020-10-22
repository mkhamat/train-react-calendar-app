function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function generateCalendar(year: number): object[][] {
  let calendar = [];
  let weekDays = new Date(year, 0, 1).getDay() - 1;
  let currentDate = new Date();
  for (let i = 1; i < 13; i++) {
    let isCurrentMonth = false;
    if (currentDate.getMonth() === i - 1) {
      isCurrentMonth = true;
    }
    let days = daysInMonth(i, year);
    let month: {}[] = [];
    for (let j = 1; j < days + 1; j++) {
      let isCurrent = false;
      if (weekDays > 6) weekDays = 0;
      if (currentDate.getDate() === j && currentDate.getMonth() === i - 1) {
        isCurrent = true;
      }
      if (j === 1 && weekDays !== 0) {
        let offset = new Array(weekDays).fill({ month: months[i - 1] });
        month = month.concat(offset);
      }
      month.push({
        month: months[i - 1],
        day: j,
        current: isCurrent,
        currentMonth: isCurrentMonth,
        weekday: weekdays[weekDays],
        tasks: null,
      });

      weekDays++;
    }
    calendar.push(month);
  }
  return calendar;
}

