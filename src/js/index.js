// index.js
import "../styles/reset.css"
import "../styles/styles.css";
import TodoList from "./modules/todo.js";
import Task from "./modules/task.js";
import { renderTasks, renderTodos, renderInfo } from "./modules/dom.js";

function addDefault() {
    const defaultTodo1 = TodoList.addTodo("Grocery List", "Incomplete");
    defaultTodo1.tasks.push(new Task("Buy Milk", "Important task", "2025-07-14T10:30", "!!!"));
    defaultTodo1.tasks.push(new Task("Run 5K", "Do it later", "2026-01-22T14:45", "!!"));
    
    const defaultTodo2 = TodoList.addTodo("Workout Plan", "Incomplete");
    defaultTodo2.tasks.push(new Task("Code", "Review notes", "2026-03-18T16:00", "!"));
    defaultTodo2.tasks.push(new Task("Read", "Ask for help", "2025-12-05T09:30", "!!"));
    defaultTodo2.tasks.push(new Task("Fix Tire", "Must finish", "2027-05-09T11:10", "!!"));
    defaultTodo2.tasks.push(new Task("Title", "Must finish", "2025-06-27T12:20", "!!!"));
    
    const defaultTodo3 = TodoList.addTodo("Fix Car", "Incomplete");
    defaultTodo3.tasks.push(new Task("Study", "Check details", "2026-10-23T19:55", "!"));
    defaultTodo3.tasks.push(new Task("Important", "Review notes", "2027-02-17T18:40", "!!"));
    
    const defaultTodo4 = TodoList.addTodo("Trip Plan", "Incomplete");
    defaultTodo4.tasks.push(new Task("Pack Bags", "Do it later", "2025-11-14T22:00", "!!!"));
    defaultTodo4.tasks.push(new Task("Cook", "Review notes", "2026-04-08T15:25", "!"));
    defaultTodo4.tasks.push(new Task("Read Notes", "Ask for help", "2025-08-30T07:45", "!!!"));
    defaultTodo4.tasks.push(new Task("Fix Code", "Check details", "2026-09-19T13:10", "!!"));
    defaultTodo4.tasks.push(new Task("Title", "Ask for help", "2027-02-17T18:40", "!!"));
    defaultTodo4.tasks.push(new Task("Pack Bags", "Do it later", "2025-11-14T22:00", "!!!"));
    defaultTodo4.tasks.push(new Task("Cook", "Review notes", "2026-04-08T15:25", "!"));
    defaultTodo4.tasks.push(new Task("Read Notes", "Ask for help", "2025-08-30T07:45", "!!!"));
    defaultTodo4.tasks.push(new Task("Fix Code", "Check details", "2026-09-19T13:10", "!!"));
    defaultTodo4.tasks.push(new Task("Title", "Ask for help", "2027-02-17T18:40", "!!"));
    defaultTodo4.tasks.push(new Task("Pack Bags", "Do it later", "2025-11-14T22:00", "!!!"));
    defaultTodo4.tasks.push(new Task("Cook", "Review notes", "2026-04-08T15:25", "!"));
    defaultTodo4.tasks.push(new Task("Read Notes", "Ask for help", "2025-08-30T07:45", "!!!"));
    defaultTodo4.tasks.push(new Task("Fix Code", "Check details", "2026-09-19T13:10", "!!"));
    defaultTodo4.tasks.push(new Task("Title", "Ask for help", "2027-02-17T18:40", "!!"));
    defaultTodo4.tasks.push(new Task("Pack Bags", "Do it later", "2025-11-14T22:00", "!!!"));
    defaultTodo4.tasks.push(new Task("Cook", "Review notes", "2026-04-08T15:25", "!"));
    defaultTodo4.tasks.push(new Task("Read Notes", "Ask for help", "2025-08-30T07:45", "!!!"));
    defaultTodo4.tasks.push(new Task("Fix Code", "Check details", "2026-09-19T13:10", "!!"));
    defaultTodo4.tasks.push(new Task("Title", "Ask for help", "2027-02-17T18:40", "!!"));
    
};

addDefault();
renderTodos();
renderTasks();
renderInfo();