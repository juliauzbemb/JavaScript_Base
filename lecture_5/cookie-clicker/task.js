"use strict";

document.addEventListener("DOMContentLoaded", function() {

    let image = document.getElementById("cookie");
    let speed = document.getElementById('clicker__speed');
    let clickerCounter = document.getElementById("clicker__counter");
    let start = 0;
    let end;

    let imageWidthSetter = function () {
        image.width = 200;
    }

    image.addEventListener('click', function () {
        end = new Date();
        if (start !== 0) {
            let speedCurrent = 1000 / (end - start);
            speed.textContent = speedCurrent.toFixed(2).toString();
        }
        start = new Date();
        clickerCounter.textContent++;
        image.width = 300;
        setTimeout(imageWidthSetter, 100);
    })
})