import React, { useState } from "react";

export type Day = {
  month: string;
  day: number;
  current: boolean;
  currentMonth: boolean;
  weekday: string;
  tasks: string | null;
};

export default function Calendar({
  calendar,
  year,
}: {
  calendar: Day[][] | null;
  year: number;
}) {
  const [selectedMonth, setSelectedMonth] = useState<Day[] | null>(null);
  if (selectedMonth) {
    return (
      <Month
        selected={true}
        month={selectedMonth}
        set={setSelectedMonth}
        year={year}
      />
    );
  }
  return (
    <>
      <h1 className={"year"}>{year}</h1>
      <hr />
      <div className={"calendar-container"}>
        {calendar &&
          calendar.map((m, i) => {
            return (
              <Month
                key={`${i}${m[i].month}`}
                month={m}
                set={setSelectedMonth}
              />
            );
          })}
      </div>
    </>
  );
}

function Month({
  month,
  set,
  year,
  selected,
}: {
  month: Day[];
  set: React.Dispatch<React.SetStateAction<Day[] | null>>;
  year?: number;
  selected?: boolean;
}) {
  let days = month.map((d, i) => {
    return (
      <Days
        selected={selected}
        key={`${i}${d.month}${d.weekday}${d.day}`}
        d={d}
      />
    );
  });

  function handleSelection() {
    set(month);
  }

  function handleBack() {
    set(null);
  }

  if (selected) {
    return (
      <>
        <h1 className={"year"}>
          <span onClick={handleBack}>{`${month[1].month} ${year}`}</span>
        </h1>
        <div className="weekday">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div className={"wknd"}>S</div>
          <div className={"wknd"}>S</div>
        </div>
        <hr />
        <div className="month-container-selected">{days}</div>
      </>
    );
  }

  return (
    <div onClick={handleSelection} className={"month-container"}>
      <h3 className={`${month[7].currentMonth ? "current-month" : ""}`}>
        {month[1].month}
      </h3>
      {days}
    </div>
  );
}

function Days({ d, selected }: { d: Day; selected?: boolean }) {
  let current = d.current;
  return (
    <>
      <div
        className={`${selected ? "day-selected" : "day"} ${
          d.weekday === "Sat" || d.weekday === "Sun" ? "wknd" : ""
        }`}
      >
        <span className={current ? "current" : ""}>{d.day}</span>
      </div>
      {d.weekday === "Sun" && <br />}
    </>
  );
}
