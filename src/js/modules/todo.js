// todo.js

// Create todo object (project)
class Todo {
    constructor(name, status) {
        this.name = name;
        this.status = status;
    };

    editTodo(newName) {
        this.name = newName;
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