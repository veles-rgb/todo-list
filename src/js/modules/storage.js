// storage.js
import { Todo } from "./todo.js";
import TodoList from "./todo.js";
import Task from "./task.js";

// Set todo local storage (stores todos and task information)
function storeTodos() {
    const todos = TodoList.getTodos();
    localStorage.setItem("todoStore", JSON.stringify(todos));
};

// Get todo local storage if there is any
function getStoredTodos() {
    const getTodos = JSON.parse(localStorage.getItem('todoStore')) || [];
    getTodos.forEach(todo => {
        // Re-add methods to todos and tasks
        TodoList.todos.push(todo);
        Object.setPrototypeOf(todo, Todo.prototype);
        todo.tasks.forEach(task => {
            Object.setPrototypeOf(task, Task.prototype);
        });
    });
};

export { storeTodos, getStoredTodos };