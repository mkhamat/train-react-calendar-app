import React, {useEffect} from "react";
import axios from 'axios'

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

export default function Calendar({year}: calendarProps) {
    useEffect(() => {

    })
    axios.get(`http://localhost:3000/${year}`).then(res => {
        console.log(res.data)
    })
    return (
        <h1>HI</h1>
    )
}