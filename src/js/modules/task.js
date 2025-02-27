import TodoList from "./todo.js";

// Create task and methods
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "Unchecked"; // Default status
    }

    editTask(newTitle, newDescription, newDueDate, newPriority) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
    }

    static getTasks(todoIndex) {
        const todo = TodoList.getTodos()[todoIndex];
        return todo ? todo.tasks : [];
    }

    static deleteTask(todoIndex, taskIndex) {
        const todo = TodoList.getTodos()[todoIndex];
        if (todo && todo.tasks[taskIndex]) {
            todo.tasks.splice(taskIndex, 1);
        }
    }
}

export default Task;