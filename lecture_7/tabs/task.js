"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const tabs = [...document.querySelectorAll('.tab')];
    const content = [...document.querySelectorAll('.tab__content')];
    
    tabs.forEach((tab) => {
        tab.addEventListener('click', function(e) {
            const targetMenu = e.target.closest('.tabs');
            const index = tabs.indexOf(tab);
            const activeContent = targetMenu.querySelector('.tab__content_active');
            const activeTab = targetMenu.querySelector('.tab_active');

            activeContent.classList.remove('tab__content_active');
            activeTab.classList.remove('tab_active');
            tab.classList.add('tab_active');
            content[index].classList.add('tab__content_active');
        })
    })
})