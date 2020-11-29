import React from "react"
import { Day } from "./calendar"

export default function MenuBar({
  setYear,
  year,
  calendar,
  setSelectedMonth,
  selectedMonth,
  selectedMode,
}: {
  year: number
  setYear: React.Dispatch<React.SetStateAction<number>>
  calendar: Day[][] | null
  setSelectedMonth: React.Dispatch<React.SetStateAction<Day[] | null>>
  selectedMonth: Day[] | null
  selectedMode: boolean
}) {
  function handleMove(direction: string) {
    if (selectedMode) {
      calendar?.find((month: Day[], i: number) => {
        if (month[0].month === (selectedMonth && selectedMonth[0].month)) {
          switch (direction) {
            case "prev":
              setSelectedMonth(calendar[i - 1])
              break
            case "next":
              setSelectedMonth(calendar[i + 1])
              break
            case "today":
              setYear(new Date().getFullYear())
              setSelectedMonth(calendar[new Date().getMonth()])
              break
            default:
              break
          }
        }
      })
    } else {
      switch (direction) {
        case "prev":
          setYear((p) => p - 1)
          break
        case "next":
          setYear((p) => p + 1)
          break
        case "today":
          setYear(new Date().getFullYear())
          break
        default:
          break
      }
    }
  }
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        backgroundColor: "#f6f6f6",
        borderTop: "solid 1px #dfdfdf",
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "1rem auto",
          color: "red",
          listStyleType: "none",
        }}
      >
        <li style={{ cursor: "pointer" }} onClick={() => handleMove("prev")}>
          Previous
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => handleMove("today")}>
          Today
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => handleMove("next")}>
          Next
        </li>
      </ul>
    </div>
  )
}
