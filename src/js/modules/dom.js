import TodoList from "./todo.js";
import Task from "./task.js";

const todoContainer = document.getElementById("todo-container");
const taskContainer = document.getElementById("task-container");
const infoContainer = document.getElementById("info-container");
const addTodoBtn = document.getElementById("add-todo");

// RENDER TODOS
function renderTodos() {
    todoContainer.innerHTML = "";
    
    TodoList.getTodos().forEach((todo, todoIndex) => {
        const todoElement = document.createElement("div");
        todoElement.textContent = `${todo.name} - ${todo.status}`;
        todoElement.classList.add("todo-item");
        todoElement.dataset.index = todoIndex;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.addEventListener("click", () => TodoEditHandler(todoIndex));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => {
            TodoDeleteHandler(todoIndex);
        });

        todoElement.appendChild(editBtn);
        todoElement.appendChild(deleteBtn);
        todoContainer.appendChild(todoElement);
    });

    renderTasks();
}

// Edit Todo Name
function TodoEditHandler(index) {
    const newName = prompt("New name:");
    const todo = TodoList.getTodos()[index];
    if (todo) {
        todo.editTodo(newName);
        renderTodos();
    }
}

// Delete Todo
function TodoDeleteHandler(index) {
    TodoList.deleteTodo(TodoList.getTodos()[index]);
    renderTodos();
}

// AddTodoBtn event listener
addTodoBtn.addEventListener("click", () => {
    const name = prompt("Todo name:");
    const status = prompt("Status:");

    if (name) {
        TodoList.addTodo(name, status);
        renderTodos();
    }
});

// RENDER TASKS
function renderTasks() {
    taskContainer.innerHTML = "";
}

// addTaskBtn event listener (add to active todo's tasks)

// Edit task

// Delete task

function renderInfo() {
    infoContainer.innerHTML = "";
};

export { renderTodos, renderTasks, renderInfo };