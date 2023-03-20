"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const modalMain = document.getElementById('modal_main');
    // console.log(modalMain);
    const modalShow = [...document.getElementsByClassName('show-success')][0];
    // console.log(modalShow);
    const modalSuccess = document.getElementById('modal_success');
    // console.log(modalSuccess);
    const modalClose = [...document.querySelectorAll('.modal__content div')];
    // console.log(modalClose);

    modalMain.classList.add('modal_active');

    modalShow.addEventListener('click', function() {
        modalMain.classList.remove('modal_active');
        modalSuccess.classList.add('modal_active');
    });

    for (let modal of modalClose) {
        modal.addEventListener('click', function() {
            modalMain.classList.remove('modal_active');
            modalSuccess.classList.remove('modal_active');
        })
    };
})
        