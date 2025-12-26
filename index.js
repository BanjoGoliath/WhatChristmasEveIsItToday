const date = new Date();
let day = 0;
let year = date.getFullYear();

let monthLengths = [31, isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let christmasDay = isLeapYear() ? 360 : 359;

const daySelectBox = document.getElementById("daySelect");
const monthSelectBox = document.getElementById("monthSelect");
const yearInputBox = document.getElementById("yearInput");

function loadPage() {
    loadDates()
    loadSelectBoxes()
}

// this makes me sad
function refreshLeapRelevantVar() {
    monthLengths = [31, isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    christmasDay = isLeapYear() ? 360 : 359;
}

function refreshButton() {
    refreshLeapRelevantVar()
    let dayayay;
    if (monthLengths[monthSelectBox.selectedIndex] < daySelectBox.value) {
        dayayay = monthLengths[monthSelectBox.selectedIndex]
    } else {
        dayayay = daySelectBox.value
    }

    if (yearInputBox.value === "") {
        year = date.getFullYear()
    } else {
        year = Number.isInteger(+yearInputBox.value) ? yearInputBox.value : date.getFullYear()
    }

    loadDates(dayayay, monthSelectBox.selectedIndex, year)
}

function loadDates(todayDate = date.getDate(),
                   todayMonth = date.getMonth(),
                   todayYear = date.getFullYear()) {
    refreshLeapRelevantVar()
    let sumOfMonthsPassed = 0;

    for (let i = 0; i < todayMonth; i++) {
        sumOfMonthsPassed += monthLengths[i];
    }

    day = Number.parseInt(todayDate) + Number.parseInt(sumOfMonthsPassed);

    document.getElementById("daDate").innerHTML = `${monthNames[todayMonth]} ${todayDate}, ${todayYear}`
    document.getElementById("whatEve").innerHTML = `${getDayTitle()}`
}

function getDayTitle() {
    refreshLeapRelevantVar()
    let timesEve = christmasDay - day
    if (timesEve > 0) {
        document.getElementById("simple").innerHTML = `Christmas (Eve multiplied by ${timesEve})`
        return "Christmas " + "Eve ".repeat(timesEve)
    } else if (timesEve === 0) {
        return "Christmas Day!"
    }
    document.getElementById("simple").innerHTML = `Christmas (Morrow multiplied by ${-timesEve})`
    return "Christmas " + "Morrow ".repeat(-timesEve)
}

function loadSelectBoxes() {
    refreshLeapRelevantVar()
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement("option");
        option.text = `${i}`;
        daySelectBox.add(option);
    }

    for (let i = 0; i < 12; i++) {
        let option = document.createElement("option");
        option.text = monthNames[i];
        monthSelectBox.add(option);
    }
}

// i'm making this a function instead of a variable for compatibility with custom dates
function isLeapYear() {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}