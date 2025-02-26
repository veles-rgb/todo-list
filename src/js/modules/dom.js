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
        todoElement.textContent = `${todo.name} - ${todo.status} - ${todo.priority}`;
        todoElement.classList.add("todo-item");

        // Add index to dataset
        todoElement.dataset.index = index;

        // Create delete button
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => deleteHandler(index));

        todoElement.appendChild(deleteBtn);
        todoContainer.appendChild(todoElement);
    });
};

// Find index and delete todo from TodoList
function deleteHandler(index) {
    const todo = TodoList.getTodos()[index];
    TodoList.deleteTodo(todo);
    renderTodos();
};

AddTodoBtn.addEventListener("click", () => {
    const name = prompt("Todo name:");
    const status = prompt("Status:");
    const priority = prompt("Priority:")

    if (name) {
        TodoList.addTodo(name, status, priority);
        renderTodos();
    };
});

export { renderTodos };