import React, { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import Calendar, { Day } from "./components/calendar"
import generateCalendar from "./calendar"

function App() {
  const [calendar, setCalendar] = useState<Day[][] | null>(null)
  const [year, setYear] = useState(new Date().getFullYear())
  useEffect(() => {
    setCalendar(generateCalendar(year))
    // axios.get(`/${year}`).then((res) => {
    //   setCalendar(res.data)
    // })
  }, [year])
  return <Calendar year={year} calendar={calendar} setYear={setYear} />
}

export default App
