'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('task__input');
    const tasksList = document.getElementById('tasks__list');
    const storageKey = 'ToDo';
    loadContent(storageKey);
    // console.log(localStorage.getItem('ToDo'));


    function deleteTaskEvent(task) {
        task.querySelector('.task__remove').addEventListener('click', (e) => {
            e.preventDefault();
            task.remove();
            saveContent(storageKey);
        })
    }


    function saveContent(name) {
        const string = JSON.stringify(tasksList.innerHTML);
        localStorage.setItem(name, string);
    }


    function loadContent(name) {
        const loaded = JSON.parse(localStorage.getItem(name));
        tasksList.innerHTML = loaded;
        const tasks = tasksList.querySelectorAll('.task');
        tasks.forEach((task) => { deleteTaskEvent(task) });
    }


    input.addEventListener('change', function(e) {
        if (input.value) {
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.innerHTML = `
            <div class="task__title">
              ${input.value}
            </div>
            <a href="#" class="task__remove">&times;</a>`;
            tasksList.appendChild(newTask);
            input.value = '';
            deleteTaskEvent(newTask);
            saveContent(storageKey);
        };
    });
})