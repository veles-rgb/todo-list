// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import Task from "./modules/task.js";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";

function addDefault() {
    const defaultTodo1 = TodoList.addTodo("Make A Todo App", "Incomplete");
    defaultTodo1.tasks.push(new Task("Do this", "Description", "dueDate", "Priority"));
    defaultTodo1.tasks.push(new Task("Do that", "Description", "dueDate", "Priority"));
    const defaultTodo2 = TodoList.addTodo("Test", "Incomplete");
    defaultTodo2.tasks.push(new Task("Title", "Description", "dueDate", "Priority"));
    defaultTodo2.tasks[0].notes = "test"
};

addDefault();
renderTodos();
renderTasks();
renderInfo();