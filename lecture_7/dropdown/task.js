"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const dropdownValues = [...document.querySelectorAll('.dropdown__value')];

    dropdownValues.forEach((value) => {
        value.addEventListener('click', function(event) {
            const dropdown = event.target.closest('.dropdown');
            const dropdownList = dropdown.querySelector('.dropdown__list');
            const dropdownItems = [...dropdown.getElementsByClassName('dropdown__item')];

            dropdownList.classList.toggle('dropdown__list_active');

            dropdownItems.forEach((item) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    value.textContent = item.textContent;
                    dropdownList.classList.remove('dropdown__list_active');
                })
            })
        })
    })
})