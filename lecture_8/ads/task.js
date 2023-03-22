'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const rotatorsCards = [...document.getElementsByClassName('card')];

    rotatorsCards.forEach((card) => {

        const rotatorsCases = [...card.getElementsByClassName('rotator__case')];

        function isRotatorActive(rotator) {
            return rotator.classList.contains('rotator__case_active');
        }
    
        function setIndex(currentRotatorIndex) {
            return (currentRotatorIndex === (rotatorsCases.length - 1) ? 0 : ++currentRotatorIndex);
        }
    
        function changeRotatorClass(rotator) {
            rotator.classList.toggle('rotator__case_active');
        }

        function setNewInterval(speed) {
            let rotatorNewInterval = setInterval(function() {
                let currentRotatorIndex = rotatorsCases.findIndex(isRotatorActive);
                let nextRotatorIndex = setIndex(currentRotatorIndex);
                changeRotatorClass(rotatorsCases[currentRotatorIndex]);
                changeRotatorClass(rotatorsCases[nextRotatorIndex]);
                rotatorsCases[nextRotatorIndex].style.color = rotatorsCases[nextRotatorIndex].dataset.color;
                clearInterval(rotatorNewInterval);
                setNewInterval(rotatorsCases[setIndex(nextRotatorIndex)].dataset.speed);
            }, speed);
        }

        rotatorsCases[rotatorsCases.findIndex(isRotatorActive)].style.color = rotatorsCases[rotatorsCases.findIndex(isRotatorActive)].dataset.color;
        setNewInterval(card.querySelector('span.rotator__case_active').dataset.speed);
    })
})