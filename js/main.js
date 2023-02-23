const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(task => renderTask(task));

addRemoveTitle();

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };
    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask)

    taskInput.value = "";
    taskInput.focus();

    addRemoveTitle();
}

function addRemoveTitle() {
    if (tasks.length !== 0) {
        emptyList.classList.add("none");
    } else {
        emptyList.classList.remove("none");
    }
}

function deleteTask(event) {
    if (event.target.dataset.action !== "delete") return;

    const parentNode = event.target.closest(".task-item");
    const id = Number(parentNode.id);

    tasks = tasks.filter(task => task.id !== id);

    saveToLocalStorage();

    parentNode.remove();

    addRemoveTitle();
}

function doneTask(event) {
    if (event.target.dataset.action !== "done") return;

    const parentNode = event.target.closest(".list-group-item");
    const id = Number(parentNode.id);

    const task = tasks.find(task => task.id === id);
    task.done = !task.done;

    saveToLocalStorage()

    const taskTitle = parentNode.querySelector(".task-title");

    taskTitle.classList.toggle("task-title--done");
}

function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    const taskHTML = `
                        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                            <span class="${cssClass}">${task.text}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/close.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                        </li>`;

    tasksList.insertAdjacentHTML("beforeend", taskHTML);
}