// task.js
import TodoList from "./todo.js";

// Create task and methods
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "Incomplete"; // Default status
        this.notes = "";
    };
    // Edit task method
    editTask(newTitle, newDescription, newDueDate, newPriority) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
    };

    // Delete task
    deleteTask(todoIndex, taskIndex) {
        TodoList.getTodos()[todoIndex].tasks.splice(taskIndex, 1);
    };
};

export default Task;