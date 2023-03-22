'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const revealElements = [...document.querySelectorAll('.reveal')];

    function isVisible(element) {
        const {top, bottom} = element.getBoundingClientRect();

        if (bottom < 0) {
            return false;
        }

        if (top > window.innerHeight) {
            return false;
        }

        return true;
    }

    window.addEventListener('scroll', (e) => {
        revealElements.forEach((reveal) => {
            if (isVisible(reveal)) {
                reveal.classList.add('reveal_active');
            } else {
                reveal.classList.remove('reveal_active');
            }
        })
    })
})