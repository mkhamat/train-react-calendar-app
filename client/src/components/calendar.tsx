import React, { Dispatch, Props, SetStateAction, useState } from "react"
import styled, { Keyframes, keyframes } from "styled-components"

export type Day = {
  month: string
  day: number
  current: boolean
  currentMonth: boolean
  weekday: string
  tasks: string | null
}

const CalendarContainer = styled.div<{ anim: any; reverse: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 700px;
  margin: 1rem auto;
  animation: ${(props: any) => props.anim} 0.6s
    ${(props: any) => props.reverse && "reverse"};
`

export default function Calendar({
  calendar,
  year,
}: {
  calendar: Day[][] | null
  year: number
}) {
  const [selectedMonth, setSelectedMonth] = useState<Day[] | null>(null)
  const [keyfs, setKeyfs] = useState<Keyframes | null>(null)
  const [reverse, setReverse] = useState(false)

  function zoomMonth(index: any) {
    let i = index

    let chart = [
      { x: 30, y: 30 },
      { x: 0, y: 30 },
      { x: -30, y: 30 },
      { x: 30, y: 0 },
      { x: 0, y: 0 },
      { x: -30, y: 0 },
      { x: 30, y: -20 },
      { x: 0, y: -20 },
      { x: -30, y: -20 },
      { x: 30, y: -40 },
      { x: 0, y: -40 },
      { x: -30, y: -40 },
    ]

    return keyframes`
      from {
        transform: scale3d(1, 1, 1) translate(0,0);
        opacity: 1;
              }
      to {
        transform: scale3d(3, 3, 3) translate(${chart[i].x}%, ${chart[i].y}%);
        opacity: .5;
  } `
  }

  if (selectedMonth) {
    return (
      <Month
        selected={true}
        month={selectedMonth}
        set={setSelectedMonth}
        year={year}
        zoomMonth={zoomMonth}
        setKeyfs={setKeyfs}
        setReverse={setReverse}
      />
    )
  }
  return (
    <>
      <h1 className={"year"}>{year}</h1>
      <hr />
      <CalendarContainer anim={keyfs} reverse={reverse}>
        {calendar &&
          calendar.map((m, i) => {
            return (
              <Month
                key={`${i}${m[i].month}`}
                month={m}
                set={setSelectedMonth}
                zoomMonth={zoomMonth}
                setKeyfs={setKeyfs}
                setReverse={setReverse}
              />
            )
          })}
      </CalendarContainer>
    </>
  )
}

function Month({
  month,
  set,
  year,
  selected,
  zoomMonth,
  setKeyfs,
  setReverse,
}: {
  month: Day[]
  set: React.Dispatch<React.SetStateAction<Day[] | null>>
  year?: number
  selected?: boolean
  zoomMonth?: (index: number) => Keyframes
  setKeyfs?: Dispatch<SetStateAction<Keyframes | null>>
  setReverse: Dispatch<SetStateAction<boolean>>
}) {
  let days = month.map((d, i) => {
    return (
      <Days
        selected={selected}
        key={`${i}${d.month}${d.weekday}${d.day}`}
        d={d}
      />
    )
  })

  async function navigate(month: any, back?: boolean) {
    if (back) setReverse(true)
    else setReverse(false)
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
    ]
    if (months.indexOf(month[1].month) < 0) {
      return
    } else {
      let index: any = months.indexOf(month[1].month)
      zoomMonth && setKeyfs && setKeyfs(zoomMonth(index))
      await setTimeout(
        () => {
          set(back ? null : month)
          // setKeyfs && setKeyfs(null)
        },
        back ? 0 : 600
      )
    }
  }

  if (selected) {
    return (
      <>
        <h1 className={"year"}>
          <span
            onClick={() => navigate(month, true)}
          >{`${month[1].month} ${year}`}</span>
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
    )
  }

  return (
    <div onClick={() => navigate(month)} className={"month-container"}>
      <h3 className={`${month[7].currentMonth ? "current-month" : ""}`}>
        {month[1].month}
      </h3>
      {days}
    </div>
  )
}

function Days({ d, selected }: { d: Day; selected?: boolean }) {
  let current = d.current
  return (
    <>
      <div
        className={`${selected ? "day-selected" : "day"} ${
          d.weekday === "Sat" || d.weekday === "Sun" ? "wknd" : ""
        }`}
      >
        <div className={current ? "current" : ""}>{d.day}</div>
      </div>
      {d.weekday === "Sun" && <br />}
    </>
  )
}
