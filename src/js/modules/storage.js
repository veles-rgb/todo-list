// storage.js
import { Todo } from "./todo.js";
import TodoList from "./todo.js";
import Task from "./task.js"

// Set todo local storage
function storeTodos() {
    const todos = TodoList.getTodos();
    localStorage.setItem("todoStore", JSON.stringify(todos));
};

function getStoredTodos() {
    const getTodos = JSON.parse(localStorage.getItem('todoStore')) || [];
    getTodos.forEach(todo => {
        TodoList.todos.push(todo)
        Object.setPrototypeOf(todo, Todo.prototype)
        todo.tasks.forEach(task => {
            Object.setPrototypeOf(task, Task.prototype)
        });
    });
}

export { storeTodos, getStoredTodos }