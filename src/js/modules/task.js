import TodoList from "./todo.js";

// Create task and methods
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "Unchecked"; // Default status
    };

    editTask(newTitle, newDescription, newDueDate, newPriority) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
    };

    // Delete task

    // Get tasks

};

export default Task;