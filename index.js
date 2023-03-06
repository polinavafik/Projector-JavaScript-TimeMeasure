const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const presetOneWeek = document.querySelector('.btn-one-week')
const presetOneMonth = document.querySelector('.btn-one-month');
//const radioButtons = document.querySelectorAll('input[name="radios"]');

const onlyWeekDays = document.querySelector('.btn-only-weekdays');
const onlyWeekEnds = document.querySelector('.btn-only-weekends');
const allDays = document.querySelector('.btn-all-days');
let specialOptionResult;


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


allDays.addEventListener('click', function () {
    if (allDays.checked === true && allDays.value === 'allDays') {
        let allDays = 0;
        for (let date = new Date(startDate.value);
            date <= new Date(endDate.value);
            date.setDate(date.getDate() + 1)) {
            if (date.getDay() <= 6) {
                allDays++;
            }
        }
        specialOptionResult = allDays;
        console.log(specialOptionResult)
    }
})
onlyWeekDays.addEventListener('click', function () {
    if (onlyWeekDays.checked === true && onlyWeekDays.value === 'onlyWeekdays') {
        let weekdays = 0;
        for (let date = new Date(startDate.value);
            date <= new Date(endDate.value);
            date.setDate(date.getDate() + 1)) {
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                weekdays++;
            }
        }
        specialOptionResult = weekdays;
        console.log(specialOptionResult)
    }
})
onlyWeekEnds.addEventListener('click', function () {
    if (onlyWeekEnds.checked === true && onlyWeekEnds.value === 'onlyWeekends') {
        let weekends = 0;
        for (let date = new Date(startDate.value);
            date <= new Date(endDate.value);
            date.setDate(date.getDate() + 1)) {
            if (date.getDay() === 0 || date.getDay() === 6) {
                weekends++;
            }
        }
        specialOptionResult = weekends;
        console.log(specialOptionResult)
    }
})






calculate.addEventListener('click', () => {

    if (startDate.value === '') {
        resultArea.innerHTML = 'Put your dates first :)'
    } else if (endDate.value === '') {
        resultArea.innerHTML = 'You should have an End Date as well!'
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

let playAudio = document.querySelector('.section__selector-div'),
    sound = document.querySelector('#bgdsound')
audios = document.querySelectorAll('audio');


playAudio.addEventListener('mouseover', function () {
    [].forEach.call(audios, function (audio) {
        // do whatever
        audio.play();
    });
}, false);

playAudio.addEventListener('mouseleave', function () {
    sound.pause();
    sound.currentTime = 0;
}, false);



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
