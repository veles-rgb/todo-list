// todo.js
// Create todo object (project)
class Todo {
    constructor(name, status, priority) {
        this.name = name;
        this.status = status;
        this.priority = priority;
    };

    editToto(newName, newStatus, newPriority) {
        this.name = newName;
        this.status = newStatus;
        this.priority = newPriority;
    };
};

// Create todo list and methods
class TodoList {
    constructor() {
        this.todos = [];
    };

    addTodo(name, status, priority) {
        const newTodo = new Todo(name, status, priority);
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