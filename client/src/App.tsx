import React, {useState} from 'react';
import './App.css';
import Calendar from "./components/calendar";

function App() {
    const [calendar, setCalendar] = useState<object[][] | null>(null)
    const currentYear = new Date().getFullYear()
    return (
        <Calendar year={currentYear} calendar={calendar} setCalendar={setCalendar}/>
    );
}

export default App;
