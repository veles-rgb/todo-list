// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import Task from "./modules/task.js";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";

function addDefault() {
    const defaultTodo1 = TodoList.addTodo("Make A Todo App", "Incomplete");
    defaultTodo1.tasks.push(new Task("Do this", "Description", "2025-03-10T15:30", "!!!"));
    defaultTodo1.tasks.push(new Task("Do that", "Description", "2025-12-25T08:15", "!!"));
    const defaultTodo2 = TodoList.addTodo("Test", "Incomplete");
    defaultTodo2.tasks.push(new Task("Title", "Description", "2026-07-04T19:45", "!"));
    defaultTodo2.tasks[0].notes = "test"
};

addDefault();
renderTodos();
renderTasks();
renderInfo();