'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const plusButton = [...document.querySelectorAll('.product__quantity-control_inc')];
    const minusButton = [...document.querySelectorAll('.product__quantity-control_dec')];
    const addBusketButton = [...document.querySelectorAll('.product__add')];
    const cartProducts = document.querySelector('.cart__products');
    const cart = document.querySelector('.cart');


    function initBasket() {
        if (getCurrentBasket().length == 0) {
            cart.classList.add('cart__hidden');
        }
    }


    function changeQuantity(buttonType, operator) {
        buttonType.forEach((button) => {
            button.addEventListener('click', (e) => {
                let parentProduct = e.target.closest('.product');
                let productQuantity = parentProduct.querySelector('.product__quantity-value');
                if (operator === 'plus') {
                    productQuantity.textContent = parseInt(productQuantity.textContent) + 1;
                } else if (operator === 'minus') {
                    if (parseInt(productQuantity.textContent) > 1) {
                        productQuantity.textContent = parseInt(productQuantity.textContent) - 1;
                    }
                }
            })
        })
    }

    function handleBasket() {
        addBusketButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                let parentProduct = e.target.closest('.product');
                let productId = parentProduct.dataset.id;
                let productImgSrc = parentProduct.querySelector('img').src;
                let productQuantity = parseInt(parentProduct.querySelector('.product__quantity-value').textContent);
                renderBasketItem(productId, productImgSrc, productQuantity);
                setCartVisibility();
                let deleteButton = [...document.getElementsByClassName('cart__product-delete')];
                deleteFromBasket(deleteButton);
            })
        })
    }


    function renderBasketItem(id, src, quantity) {
        let cartContent = getCurrentBasket();
        if (cartContent.some(product => (product.dataset.id === id))) {
            let index = cartContent.findIndex((item) => item.dataset.id === id);
            let newItem = document.createElement('div');
            let currentQuantity = parseInt(cartContent[index].querySelector('.cart__product-count').textContent);
            newItem.setAttribute('class', 'cart__product');
            newItem.dataset.id = id;
            newItem.innerHTML = `<img class="cart__product-image" src="${src}">
            <div class="cart__product-count">${quantity + currentQuantity}</div>
            <button class="cart__product-delete">удалить</button>`
            cartProducts.replaceChild(newItem, cartContent[index]);
        } else {
            cartProducts.innerHTML += `<div class="cart__product" data-id="${id}">
            <img class="cart__product-image" src="${src}">
            <div class="cart__product-count">${quantity}</div>
            <button class="cart__product-delete">удалить</button>
        </div>`
        };    
    }


    function getCurrentBasket() {
        let currentBasket = [...document.querySelectorAll('.cart__product')];
        return currentBasket;
    }


    function setCartVisibility() {
        if (getCurrentBasket().length > 0) {
            cart.classList.remove('cart__hidden');
        }
    }


    function deleteFromBasket(deleteButton) {
        deleteButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.target.parentElement.remove();
                initBasket();
            })
        })
    }


    initBasket();
    changeQuantity(plusButton, 'plus');
    changeQuantity(minusButton, 'minus');
    handleBasket();
})