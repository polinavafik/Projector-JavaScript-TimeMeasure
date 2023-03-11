const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const presetOneWeek = document.querySelector('.btn-one-week')
const presetOneMonth = document.querySelector('.btn-one-month');
const allDays = document.querySelector('.btn-all-days');
const onlyWeekDays = document.querySelector('.btn-only-weekdays');
const onlyWeekEnds = document.querySelector('.btn-only-weekends');
const timeDimension = document.querySelector('.section__selector')
const calculate = document.querySelector('.result-btn')
const resultArea = document.querySelector('.result-area')
const table = document.querySelector('.section__table')
const lastResult = localStorage.getItem('last calculation')
const used = localStorage.getItem('used')
let specialOptionResult;

showTable()


startDate.addEventListener('change', function dateValidation() {
    if (startDate.value !== '') {
        endDate.disabled = false;
        endDate.min = startDate.value
    } else {
        endDate.disabled = true;
    }
})
startDate.addEventListener('change', function noCheatingWithDates() {
    if (startDate.value > endDate.value) {
        endDate.value = '';
    }

})


presetOneWeek.addEventListener('click', () => {
    if (startDate.value === '') {
        resultArea.innerHTML = 'Put the Start Date first!'
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
    if (startDate.value === '') {
        resultArea.innerHTML = 'Put the Start Date first!'
    }

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
        resultArea.innerHTML = 'Put your dates first :)'
    } else if (endDate.value === '') {
        resultArea.innerHTML = 'You should have an End Date as well!'
    } else if (!allDays.checked && !onlyWeekDays.checked && !onlyWeekEnds.checked) {
        resultArea.innerHTML = 'You should choose at least one Special Option'
    } else if (timeDimension.value === 'Choose') {
        resultArea.innerHTML = 'Dont forget to choose your time dimention type <3'
    } else {
        calculateResult()
    }
})

function calculateResult() {
    specialOptionCalculate()

    let result = specialOptionResult;
    if (timeDimension.value === 'seconds') {
        result = result * 24 * 60 * 60;
        resultArea.innerHTML = `Its ${result} seconds between your two dates     *considering chosen special options `;
    } else if (timeDimension.value === 'minutes') {
        result = result * 24 * 60;
        resultArea.innerHTML = `Its ${result} minutes between your two dates*    *considering chosen special options `;
    } else if (timeDimension.value === 'hours') {
        result = result * 24;
        resultArea.innerHTML = `Its ${result} hours between your two dates*     *considering chosen special options `;
    } else if (timeDimension.value === 'days') {
        resultArea.innerHTML = `Its ${result} days between your two dates     *considering chosen special options `;
    }
    localStorage.setItem('last calculation', `${result} ${timeDimension.value}`)
    localStorage.setItem('used', true)
    storeDates()
    table.hidden = false // якщо сюди вставити showTable() то її не показує
    storeResultInTable()

}

function specialOptionCalculate() {
    if (allDays.checked) {
        let startDateValue = Date.parse(startDate.value)
        let endDateValue = Date.parse(endDate.value)
        specialOptionResult = endDateValue - startDateValue;
        specialOptionResult = specialOptionResult / 1000 / 60 / 60 / 24;
    }
    else if (onlyWeekDays.checked) {
        let weekdays = 0;
        for (let date = new Date(startDate.value); date <= new Date(endDate.value); date.setDate(date.getDate() + 1)) {
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                weekdays++;
            }
        }
        specialOptionResult = weekdays;
    }
    else if (onlyWeekEnds.checked) {
        let weekends = 0;
        for (let date = new Date(startDate.value); date <= new Date(endDate.value); date.setDate(date.getDate() + 1)) {
            if (date.getDay() === 0 || date.getDay() === 6) {
                weekends++;
            }
        }
        specialOptionResult = weekends;
    }
}

function storeDates() {
    localStorage.setItem('last start date', startDate.value)
    localStorage.setItem('last end date', endDate.value)
}

function showTable() {
    if (used) {
        table.hidden = false;
    } else { }
}

const sectionTableTr = document.querySelector('.section__table-tr')

function storeResultInTable() {
    let newRow = table.insertRow(-1);

    let startDateCell = newRow.insertCell(0);
    let endDateCell = newRow.insertCell(1);
    let resultCell = newRow.insertCell(2);


    newRow.classList.add('section__table-tr')
    startDateCell.classList.add('section__table-td')
    endDateCell.classList.add('section__table-td')
    resultCell.classList.add('section__table-td')

    let startDateText = document.createTextNode(localStorage.getItem('last start date'));
    let endDateText = document.createTextNode(localStorage.getItem('last end date'));
    let resultText = document.createTextNode(localStorage.getItem('last calculation'));

    startDateCell.appendChild(startDateText);
    endDateCell.appendChild(endDateText);
    resultCell.appendChild(resultText);
}


table.insertAdjacentHTML('beforeend', '')
table.insertAdjacentElement('beforeend',)
























let playAudio = document.querySelector('.section__selector-div'),
    sound = document.querySelector('#bgdsound')
audios = document.querySelectorAll('audio');
playAudio.addEventListener('mouseover', function () {
    [].forEach.call(audios, function (audio) {
        audio.play();
    });
}, false);
playAudio.addEventListener('mouseleave', function () {
    sound.pause();
    sound.currentTime = 0;
}, false);
