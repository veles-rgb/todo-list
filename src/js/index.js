// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import Task from "./modules/task.js";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";
import { getStoredTodos } from "./modules/storage.js";

getStoredTodos();
renderTodos();
renderTasks();
renderInfo();