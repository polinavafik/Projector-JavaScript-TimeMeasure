const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');

const presetOneWeek = document.querySelector('.btn-one-week')
const presetOneMonth = document.querySelector('.btn-one-month');


const allDays = document.querySelector('.btn-all-days');
const onlyWeekDays = document.querySelector('.btn-only-weekdays');
const onlyWeekEnds = document.querySelector('.btn-only-weekends');
let specialOptionResult;


const timeDimension = document.querySelector('.section__selector')
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

//endDate ивент листенер чтобы оно чекало какая дата в старте и не позволяло ее менять и ставить раньше чем в дате начала

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

//сделать так чтобы олл дейс было дефолтом и с самого начала всегда чекнуто
allDays.addEventListener('click', function () {
    if (allDays.checked) {
        let startDateValue = Date.parse(startDate.value)
        let endDateValue = Date.parse(endDate.value)

        specialOptionResult = endDateValue - startDateValue;
        specialOptionResult = specialOptionResult / 1000 / 60 / 60 / 24;
    }
})
onlyWeekDays.addEventListener('click', function () {
    if (onlyWeekDays.checked) {
        let weekdays = -1;
        for (let date = new Date(startDate.value);
            date <= new Date(endDate.value);
            date.setDate(date.getDate() + 1)) {
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                weekdays++;
            }
        }
        specialOptionResult = weekdays;
    }
})
onlyWeekEnds.addEventListener('click', function () {
    if (onlyWeekEnds.checked) {
        let weekends = 0;
        for (let date = new Date(startDate.value);
            date <= new Date(endDate.value);
            date.setDate(date.getDate() + 1)) {
            if (date.getDay() === 0 || date.getDay() === 6) {
                weekends++;
            }
        }
        specialOptionResult = weekends;
    }
})

// сделаь отдельный ивент лисенер, чисто для тайм деменшен где по дефолту мы даем ему значение дни, и можно протом выбрать что то другое. В калкулейт сделать отедлно функцию валидатора и отдельно функцыю калкулятора
//решить проблему что если второй раз считааешь, то не нужно еще раз выбирать спешел опшен
//сделать чтобы оно записывало в локал сторедж, пример есть в ту ду листе

function calculateValidation() {
    if (startDate.value === '') {
        resultArea.innerHTML = 'Put your dates first :)'
    } else if (endDate.value === '') {
        resultArea.innerHTML = 'You should have an End Date as well!'
    } else if (!allDays.checked && !onlyWeekDays.checked && !onlyWeekEnds.checked) {
        resultArea.innerHTML = 'You should choose at least one Special Option'
    } else if (timeDimension.value === 'Choose') {
        resultArea.innerHTML = 'Dont forget to choose your time dimention type <3'
    }
}


calculate.addEventListener('click', () => {
    let result = specialOptionResult;
    calculateValidation()


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
})



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
