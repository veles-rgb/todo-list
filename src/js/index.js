// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import { renderTodos } from "./modules/dom.js";


TodoList.addTodo("Build A House", "Incomplete", "!!!")
renderTodos();