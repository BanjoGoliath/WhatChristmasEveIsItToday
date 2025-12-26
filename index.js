const date = new Date();
let isLeapYear = date.getFullYear() % 4 === 0 && date.getFullYear() % 10 !== 0;

const monthLengths = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let christmasDay = isLeapYear ? 360 : 359;
let day = 0;

function loadDates() {
    let sumOfMonthsPassed = 0;

    for (let i = 0; i < date.getMonth(); i++) {
        sumOfMonthsPassed += monthLengths[i];
    }

    day = date.getDate() + sumOfMonthsPassed;

    document.getElementById("daDate").innerHTML = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    document.getElementById("whatEve").innerHTML = `${getDayTitle()}`
}

function getDayTitle() {
    let timesEve = christmasDay - day
    if (timesEve > 0) {
        return "Christmas " + "Eve ".repeat(timesEve)
    }

    return "Christmas " + "Morrow ".repeat(-timesEve)
}