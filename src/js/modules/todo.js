// todo.js
import Task from "./task";

// Create todo object (project)
class Todo {
    constructor(name, status) {
        this.name = name;
        this.status = status;
        this.tasks = [];
    };

    editTodo(newName) {
        this.name = newName;
    };

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

    addTodo(name, status) {
        const newTodo = new Todo(name, status);
        this.todos.push(newTodo);
        return newTodo;
    };

    deleteTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        };
    };

    getTodos() {
        return this.todos;
    };
};

export default new TodoList();