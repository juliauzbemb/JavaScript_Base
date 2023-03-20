"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const sliderItems = [...document.querySelectorAll('.slider__item')];
    const arrowPrev = document.querySelector('.slider__arrow_prev');
    const arrowNext = document.querySelector('.slider__arrow_next');
    const dots = [...document.querySelectorAll('.slider__dot')];
    dots[getActiveIndex()].classList.add('slider__dot_active');

    function getActiveIndex() {
        return sliderItems.findIndex(item => item.className.includes('slider__item_active'));
    }

    function addActiveClass(index) {
        sliderItems[index].classList.add('slider__item_active');
        dots[index].classList.add('slider__dot_active');
    }

    function setActiveItem(index) {
        const activeIndex = getActiveIndex();
        sliderItems[activeIndex].classList.remove('slider__item_active');
        dots[activeIndex].classList.remove('slider__dot_active');

        if (index >= sliderItems.length) {
            index = 0;
            addActiveClass(index);
        } else if (index < 0) {
            index = (sliderItems.length - 1);
            addActiveClass(index);
        } else {
            addActiveClass(index);
        }
    }

    arrowNext.addEventListener('click', function() {
        setActiveItem(getActiveIndex() + 1);
    })

    arrowPrev.addEventListener('click', function() {
        setActiveItem(getActiveIndex() - 1);
    })

    for (let dot of dots) {
        dot.addEventListener('click', function() {
            let dotIndex = dots.indexOf(dot);
            dots.forEach((dot) => {
                if (dot.className.includes('slider__dot_active')) {
                    dot.classList.remove('slider__dot_active');
                };
            });
            sliderItems[getActiveIndex()].classList.remove('slider__item_active');
            addActiveClass(dotIndex);
        })
    }
})