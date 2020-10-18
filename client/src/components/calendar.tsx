import React, {useEffect} from "react";
import axios from 'axios'

type calendarProps = {
    year: number,
    calendar: object[][] | null,
    setCalendar: (calendar: object[][]) => void
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