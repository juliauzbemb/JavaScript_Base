'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const sizes = {
        0: 'book_fs-small',
        1: '',
        2: 'book_fs-big',
    };

    const colors = {
        0: '',
        1: 'book_color-gray',
        2: 'book_color-whitesmoke',
    };

    const backgrounds = {
        0: 'book_bg-black',
        1: 'book_bg-gray',
        2: '',
    }

    const sizeControls = [...document.getElementsByClassName('font-size')];
    const colorControls = [...document.querySelectorAll('div.book__control_color a.color')];
    const backgroundControls = [...document.querySelectorAll('div.book__control_background a.color')];
    const bookContent = document.getElementById('book');


    function getAttributeType(element) {
        return element.classList.contains('color') ? 'color' : element.classList.contains('font-size') ? 'font_size' : '';
    }

    function isActive(element) {
        let type = getAttributeType(element);
        return type === 'color' ? element.classList.contains('color_active') : type === 'font_size' ? element.classList.contains('font-size_active') : false;
    }


    function setClass(item, currentIndex, index) {

        function changeClassList(object) {
            object[index] ? bookContent.classList.toggle(object[index]) : '';
            object[currentIndex] ? bookContent.classList.toggle(object[currentIndex]) : '';
        }

        if (item.closest('div').classList.contains('book__control_font-size')) {
            changeClassList(sizes);
        } else if (item.closest('div').classList.contains('book__control_color')) {
            changeClassList(colors);
        } else if (item.closest('div').classList.contains('book__control_background')) {
            changeClassList(backgrounds);
        };
    }


    function clickEvent(controls) {
        controls.forEach(function (item, index, controls) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                let activeIndex = controls.findIndex(isActive);
                let type = getAttributeType(item);
                if (type === 'color') {
                    controls[activeIndex].classList.toggle('color_active');
                    item.classList.toggle('color_active');
                    setClass(item, activeIndex, index);
                } else if (type === 'font_size') {
                    controls[activeIndex].classList.toggle('font-size_active');
                    item.classList.toggle('font-size_active');
                    setClass(item, activeIndex, index);
                };
            });
        });
    }
    
    clickEvent(sizeControls);
    clickEvent(colorControls);
    clickEvent(backgroundControls);
})