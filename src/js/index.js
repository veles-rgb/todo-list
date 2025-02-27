// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import Task from "./modules/task.js";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";

function addDefault() {
    const defaultTodo = TodoList.addTodo("Make A Todo App", "Incomplete");
    defaultTodo.tasks.push(new Task("Title", "Description", "dueDate", "Priority"));
};

addDefault();
renderTodos();
renderTasks();
renderInfo();