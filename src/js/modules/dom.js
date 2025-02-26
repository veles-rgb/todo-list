// DomEvents.js
import TodoList from "./todo.js";

const todoContainer = document.getElementById("todo-container");
const AddTodoBtn = document.getElementById("add-todo");


// Todo handlers
function renderTodos() {
    todoContainer.innerHTML = "";

    TodoList.getTodos().forEach((todo, index) => {
        // Create todo element
        const todoElement = document.createElement("div");
        todoElement.textContent = `${todo.name} - ${todo.status}`;
        todoElement.classList.add("todo-item");

        // Add index to dataset
        todoElement.dataset.index = index;

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.addEventListener("click", () => TodoEditHandler(index));

        // Create delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => TodoDeleteHandler(index));

        // Append children
        todoElement.appendChild(editBtn);
        todoElement.appendChild(deleteBtn);
        todoContainer.appendChild(todoElement);
    });
};

// Find index and edit Todo name with prompt
function TodoEditHandler(index) {
    const newName = prompt("New name:");
    const todo = TodoList.getTodos()[index];
    todo.editTodo(newName);
    renderTodos();
};

// Find index and delete todo from TodoList
function TodoDeleteHandler(index) {
    const todo = TodoList.getTodos()[index];
    TodoList.deleteTodo(todo);
    renderTodos();
};

AddTodoBtn.addEventListener("click", () => {
    const name = prompt("Todo name:");
    const status = prompt("Status:");

    if (name) {
        TodoList.addTodo(name, status);
        renderTodos();
    };
});

// Task handlers

export { renderTodos };