// todo.js
import Task from "./task";

// Create todo object (project)
class Todo {
    constructor(name, status) {
        this.name = name;
        this.status = "Incomplete";
        this.tasks = [];
    };
    // Edit todo method
    editTodo(newName) {
        this.name = newName;
    };
    // Add task to todo method
    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        this.tasks.push(newTask);
    };
};

// Create todo list and methods
class TodoList {
    constructor() {
        this.todos = [];
    };
    // Add todo method
    addTodo(name, status) {
        const newTodo = new Todo(name, status);
        this.todos.push(newTodo);
        return newTodo;
    };
    // Delete todo method
    deleteTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        };
    };
    // Get all todos method
    getTodos() {
        return this.todos;
    };
};

export { Todo };
export default new TodoList();