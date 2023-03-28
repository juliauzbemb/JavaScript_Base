'use strict';

document.addEventListener('DOMContentLoaded', function() {

    const botMessages = [
        'Добрый день! Спасибо за ваш вопрос!',
        'Мне требуется некоторое время, чтобы уточнить информацию', 
        'Прошу прощения за задержку с ответом',
        'У вас есть ко мне дополнительные вопросы?',
        'Уточняю информацию, ожидайте, пожалуйста',
        'К сожалению, ответ на ваш вопрос отрицательный',
        'Повежливее, пожалуйста',
        'Надеюсь, вы останетесь довольны нашим сервисом',
        'Благодарю за терпение',
        'Подождите еще чуть-чуть',
        'Супер',
        'Сегодня ничего не получится'
    ]

    const chatWidget = document.querySelector('.chat-widget');
    const clientBlock = document.getElementById('chat-widget__input');
    const messagesBlock = document.getElementById('chat-widget__messages');
    const messagesClient = document.getElementsByClassName('message_client');

    let timeout;
    let sleep;


    function openChatBox() {
        if (!chatWidget.classList.contains('chat-widget_active')) {
            clearTimeout(sleep);
            chatWidget.classList.add('chat-widget_active');
            if (!messagesClient.length) {
                renderMessage('Здравствуйте! Задайте свой вопрос в чате', 'message');
            }
            sleep = setTimeout(() => {
                if (!messagesClient.length) {
                    chatWidget.classList.remove('chat-widget_active');
                    messagesBlock.innerHTML = '';
                } else {
                    chatWidget.classList.remove('chat-widget_active');
                }
            }, 60000)
        }
    }


    function renderMessage(value, className) {
        const messageHtml = `
            <div class="${className}">
                <div class="message__time">${(new Date).toTimeString().slice(0, 5)}</div>
                <div class="message__text">${value}</div>
            </div>`;
        messagesBlock.innerHTML += messageHtml;
        messagesBlock.scrollIntoView({block: "end", inline: "end", behavior: "smooth"});
    }


    chatWidget.addEventListener('click', () => {
        openChatBox();
    })


    clientBlock.onchange = () => {
        clearTimeout(timeout);
        if (clientBlock.value.trim().length > 0) {
            renderMessage(clientBlock.value, 'message message_client');
            const botRandomIndex = Math.floor(Math.random() * botMessages.length)
            renderMessage(botMessages[botRandomIndex], "message");
            clientBlock.value = '';
            timeout = setTimeout(() => {
                renderMessage('Вы еще здесь?', 'message');
            }, 30000)
        }
    }
})