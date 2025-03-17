// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";
import { getStoredTodos } from "./modules/storage.js";

// Initial render
getStoredTodos();
renderTodos();
renderTasks();
renderInfo();