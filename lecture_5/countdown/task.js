"use strict";

document.addEventListener("DOMContentLoaded", function() {

    function getTimeRemaining(endtime) {
        let diff = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((diff / 1000) % 60);
        let minutes = Math.floor((diff / 1000 / 60) % 60);
        let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));

        return {
            total: diff,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }
    
    function initializeClock(id, endtime) {
        let clock = document.getElementById(id);
        let daysSpan = clock.querySelector(".days");
        let hoursSpan = clock.querySelector(".hours");
        let minutesSpan = clock.querySelector(".minutes");
        let secondsSpan = clock.querySelector(".seconds");
    
        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.total <= 0) {
                alert("Вы победили в конкурсе!");
                let href = document.querySelector('.download-file').getAttribute('href');
                console.log(window.location);
                window.location = href;
                clearInterval(timeinterval)
            }
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        }

        updateClock();
        let timeinterval = setInterval(updateClock, 1000);
    }
    
    let deadline = new Date(Date.parse(new Date()) + 59 * 1000);
    initializeClock("countdown", deadline);
})


