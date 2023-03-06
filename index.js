const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const presetOneWeek = document.querySelector('.btn-one-week')
const presetOneMonth = document.querySelector('.btn-one-month');
const allDays = document.querySelector('.btn-all-days');
const onlyWeekDays = document.querySelector('.btn-only-weekdays');
const onlyWeekEnds = document.querySelector('.btn-only-weekends');
const calculate = document.querySelector('.result-btn')
const resultArea = document.querySelector('.result-area')

startDate.addEventListener('change', function endDateValidation() {
    if (startDate.value !== '') {
        endDate.disabled = false;
        endDate.min = startDate.value
    } else {
        endDate.disabled = true;
    }
})




presetOneWeek.addEventListener('click', () => {
    if (startDate.value === '') {
        resultArea.innerHTML = 'Put your dates first!'
    } else {
        let startDateValue = Date.parse(startDate.value);
        let endDateValue = startDateValue + 604800000;
        let year = new Date(endDateValue).getFullYear();
        let month = ("0" + (new Date(endDateValue).getMonth() + 1)).slice(-2);
        let day = ("0" + new Date(endDateValue).getDate()).slice(-2);
        endDate.value = `${year}-${month}-${day}`
    }
})
presetOneMonth.addEventListener('click', () => {
    let startDateValue = startDate.value;
    let newMonth = startDateValue.slice(5, 7)
    newMonth = Number(newMonth) + 1
    if (newMonth < 10) {
        let endDateValue = `${startDateValue.slice(0, 5)}0${newMonth}${startDateValue.slice(7)}`
        endDate.value = endDateValue;
    } else if (newMonth < 12) {
        let endDateValue = `${startDateValue.slice(0, 5)}${newMonth}${startDateValue.slice(7)}`
        endDate.value = endDateValue;
    } else {
        let newYear = startDateValue.slice(0, 4)
        newYear = Number(newYear) + 1

        let endDateValue = `${newYear}-01${startDateValue.slice(7)}`
        endDate.value = endDateValue;
    }


})

calculate.addEventListener('click', () => {

    if (startDate.value === '') {
        resultArea.innerHTML = 'Put your dates first!'
    } else if (endDate.value === '') {
        resultArea.innerHTML = 'Put your End Date as well!'
    } else {
        let result
        let startDateValue = Date.parse(startDate.value)
        let endDateValue = Date.parse(endDate.value)

        result = endDateValue - startDateValue;
        result = result / 1000 / 60 / 60 / 24;
        if (result < 0) { result = result * -1 }
        resultArea.innerHTML = `Its ${result} days between your two dates `;
    }
})




/* 1) Функція повертатиме часовий період між цими датами 
console.log('Task 1')

function durationBetweenDates(startDate = '01 Jan 2023', endDate = new Date(Date.now()), timeDimension = 'days') {
    let result;

    let start = Date.parse(startDate)
    let end = Date.parse(endDate)

    let dateDifference = end - start;

    if (dateDifference < 0) { dateDifference = dateDifference * -1 }

    if (timeDimension === 'seconds') {
        result = dateDifference / 1000;
        return `${Math.floor(result)} seconds`
    }
    if (timeDimension === 'minutes') {
        result = dateDifference / 1000 / 60;
        return `${Math.floor(result)} minutes`
    }
    if (timeDimension === 'hours') {
        result = dateDifference / 1000 / 60 / 60;
        return `${Math.floor(result)} hours`
    }
    if (timeDimension === 'days') {
        result = dateDifference / 1000 / 60 / 60 / 24;
        return `${Math.floor(result)} days`

    }
}
console.log(durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds'))
console.log(durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days'))
console.log(durationBetweenDates())
console.log(durationBetweenDates('05 Aug 1985', '03 Aug 1985', 'seconds'))
*/
