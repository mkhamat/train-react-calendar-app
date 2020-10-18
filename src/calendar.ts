function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}

let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]

export default function generateCalendar(year: number): object[][] {
    let calendar = [];
    for (let i = 1; i < 13; i++) {
        let days = daysInMonth(i, year)
        let month = [];
        for (let j = 1; j < days + 1; j++) {
            month.push({month: months[i - 1], day: j, tasks: null})
        }
        calendar.push(month)
    }
    return calendar
}

