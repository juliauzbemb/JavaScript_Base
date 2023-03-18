"use strict";

document.addEventListener("DOMContentLoaded", function() {

    let dead = document.getElementById('dead');
    let lost = document.getElementById('lost');
    let holes = document.getElementsByClassName('hole');
    let deadCounter = parseInt(dead.textContent);
    let lostCounter = parseInt(lost.textContent);

    for (let hole of holes) {
        hole.onclick = () => {
            if (hole.classList.contains('hole_has-mole')) {
                deadCounter++;
                dead.textContent = deadCounter.toString();
                if (deadCounter === 10) {
                    alert('Вы победили!');
                    clear();
                }
            } else {
                lostCounter++;
                lost.textContent = lostCounter.toString();
                if (lostCounter === 5) {
                    alert('Вы проиграли!');
                    clear();
                }
            }
        }
    }

    function clear() {
        deadCounter = 0;
        lostCounter = 0;
        dead.textContent = deadCounter.toString();
        lost.textContent = lostCounter.toString();
    }
})