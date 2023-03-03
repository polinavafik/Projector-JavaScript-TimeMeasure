const startDate = document.querySelector('#start-date');
const endDate = document.querySelector('#end-date');
const presetOneWeek = document.querySelector('.btn-one-week')
const presetOneMonth = document.querySelector('.btn-one-month');
const allDays = document.querySelector('.btn-all-days');
const onlyWeekDays = document.querySelector('.btn-only-weekdays');
const onlyWeekEnds = document.querySelector('.btn-only-weekends');
const calculate = document.querySelector('.result-btn')



startDate.addEventListener('input', function () {
    let startdate = new Date(startDate.value)
    console.log(startdate)
})