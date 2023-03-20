"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const navMenus = [...document.querySelectorAll('.menu_main')];
    // console.log(navMenus);

    for (let navBar of navMenus) {
        const menuLinks = [...navBar.querySelectorAll('.menu__link')];
        // console.log(menuLinks);

        for (let link of menuLinks) {
            const parentElement = link.closest('.menu__item');
            // console.log(parentElement);
            const menuSub = parentElement.querySelector('.menu_sub');
            // console.log(menuSub);

            if (menuSub != null) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const menuActive = [...navBar.getElementsByClassName('menu_active')];
                    menuActive.forEach(function(element) {
                        element.classList.remove('menu_active');
                    })
                    menuSub.classList.toggle('menu_active');
                })
            } 
        }
    }
})