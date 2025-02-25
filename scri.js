document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskTime = document.getElementById('task-time');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    loadTasks();
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;
        if (taskText !== '' && date !== '' && time !== '') {
            const task = {
                text: taskText,
                date: date,
                time: time
            };
            addTask(task);
            taskInput.value = '';
            taskDate.value = '';
            taskTime.value = '';
            saveTasks();
        } else {
            alert('Please fill in all fields.');
        }
    });
    function addTask(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} (${task.date} at ${task.time})</span>
            <button class="delete-btn">Delete</button>
        `;
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            saveTasks();
        });
        taskList.appendChild(li);
    }
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function (taskLi) {
            const taskText = taskLi.querySelector('span').textContent.split(' (')[0];
            const taskDateTime = taskLi.querySelector('span').textContent.match(/\((.*?)\)/)[1];
            const [date, time] = taskDateTime.split(' at ');
            tasks.push({ text: taskText, date: date, time: time });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (task) {
            addTask(task);
        });
    }
});