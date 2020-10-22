import React from "react";

export type Day = {
  month: string;
  day: number;
  current: boolean;
  currentMonth: boolean;
  weekday: string;
  tasks: string | null;
};

export default function Calendar({ calendar }: { calendar: Day[][] | null }) {
  return (
    <div className={"calendar-container"}>
      {calendar &&
        calendar.map((m, i) => {
          return <Month key={`${i}${m[i].month}`} month={m} />;
        })}
    </div>
  );
}

function Month({ month }: { month: Day[] }) {
  return (
    <div className={"month-container"}>
      <h3 className={`${month[7].currentMonth ? 'current-month' : ''}`} >{month[1].month}</h3>
      {month.map((d, i) => {
        return <Days key={`${i}${d.month}${d.weekday}${d.day}`} d={d} />;
      })}
    </div>
  );
}

function Days({ d }: { d: Day }) {
  let current = d.current;
  return (
    <>
      <div className={`day ${current ? "current" : ""}`}>{d.day}</div>
      {d.weekday === "Sun" && <br />}
    </>
  );
}