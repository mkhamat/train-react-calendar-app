import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Calendar, { Day } from "./components/calendar";

function App() {
  const [calendar, setCalendar] = useState<Day[][] | null>(null);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    axios.get(`/${currentYear}`).then((res) => {
      setCalendar(res.data);
    });
  }, [currentYear]);
  return <Calendar year={currentYear} calendar={calendar} />;
}

export default App;
