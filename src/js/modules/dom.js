import TodoList from "./todo.js";
import Task from "./task.js";

const todoContainer = document.getElementById("todo-container");
const addTodoBtn = document.getElementById("add-todo");
const taskContainer = document.getElementById("task-container");
const addTaskBtn = document.getElementById("add-task");
const infoContainer = document.getElementById("info-container");

// RENDER TODOS
function renderTodos() {
    todoContainer.innerHTML = "";

    TodoList.getTodos().forEach((todo, todoIndex) => {
        const todoElement = document.createElement("div");
        todoElement.textContent = `${todo.name} - ${todo.status}`;
        todoElement.classList.add("todo-item");
        todoElement.dataset.index = todoIndex;

        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.classList.add("edit-todo-btn")
        editBtn.addEventListener("click", () => TodoEditHandler(todoIndex));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add("delete-todo-btn")
        deleteBtn.addEventListener("click", () => {
            TodoDeleteHandler(todoIndex);
        });

        todoElement.appendChild(editBtn);
        todoElement.appendChild(deleteBtn);
        todoContainer.appendChild(todoElement);
    });

    // Todo item eventListener
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item, todoIndex) => {
        item.addEventListener("click", () => {
            console.log(`${item.textContent} clicked!`); // Test
            // Check for active-todo class and remove all others
            if (!item.classList.contains("active-todo")) {
                todoItems.forEach((item) => {
                    item.classList.remove("active-todo");
                });
                // Add new active-todo class
                item.classList.add("active-todo");
            };
            renderTasks(item, todoIndex);
        });
    });
};

// Edit Todo Name
function TodoEditHandler(index) {
    const newName = prompt("New name:");
    const todo = TodoList.getTodos()[index];
    if (todo) {
        todo.editTodo(newName);
        renderTodos();
    };
};

// Delete Todo
function TodoDeleteHandler(index) {
    TodoList.deleteTodo(TodoList.getTodos()[index]);
    renderTodos();
};

// AddTodoBtn event listener
addTodoBtn.addEventListener("click", () => {
    const name = prompt("Todo name:");
    const status = prompt("Status:");

    if (name) {
        TodoList.addTodo(name, status);
        renderTodos();
    };
});

// RENDER TASKS
function renderTasks() {
    taskContainer.innerHTML = "";

    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item, todoIndex) => {
        if (item.classList.contains("active-todo")) {
            // Create add task btn
            const addTaskBtn = document.createElement("button");
            addTaskBtn.textContent = "Add task";
            addTaskBtn.setAttribute("id", "#add-task");
            taskContainer.appendChild(addTaskBtn);
            // addTaskBtn event listener (add to active todo's tasks)
            addTaskBtn.addEventListener("click", () => {
                const title = prompt("Enter new task name:");
                const description = prompt("Enter new task description:");
                const dueDate = prompt("Enter new task due date:");
                const priority = prompt("Enter new task priority:");
                TodoList.getTodos()[todoIndex].tasks.push(new Task(title, description, dueDate, priority));
                renderTasks();
            });
            // Create task elements
            TodoList.getTodos()[todoIndex].tasks.forEach((task, taskIndex) => {
                console.log(task); // Test
                // Create task divs
                const taskElement = document.createElement("div");
                taskElement.classList.add("task-item");
                taskElement.dataset.index = taskIndex;
                // Create task title
                const taskTitle = document.createElement("p");
                taskTitle.classList.add("task-item-title");
                taskTitle.textContent = task.title;
                // Create task description
                const taskDesc = document.createElement("p");
                taskDesc.classList.add("task-item-desc");
                taskDesc.textContent = task.description;
                // Create task dueDate
                const taskDue = document.createElement("p");
                taskDue.classList.add("task-item-due");
                taskDue.textContent = task.dueDate;
                // Create task priority
                const taskPrio = document.createElement("p");
                taskPrio.classList.add("task-item-prio");
                taskPrio.textContent = task.priority;
                // Add edit task btn
                const editBtn = document.createElement("button");
                editBtn.textContent = "✎";
                editBtn.classList.add("edit-task-btn");
                editBtn.addEventListener("click", () => taskEditHandler(task));
                // Add delete task btn
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "🗑";
                deleteBtn.classList.add("delete-task-btn");
                deleteBtn.addEventListener("click", () => taskDeleteHandler(todoIndex, taskIndex));

                // Append new task elements
                taskContainer.appendChild(taskElement);
                taskElement.appendChild(taskTitle);
                taskElement.appendChild(taskDesc);
                taskElement.appendChild(taskDue);
                taskElement.appendChild(taskPrio);
                taskElement.appendChild(editBtn);
                taskElement.appendChild(deleteBtn);
            });
        };
        // Task item eventListener (add active task class)
        const taskItems = document.querySelectorAll(".task-item")
        taskItems.forEach((task, taskIndex) => {
            task.addEventListener("click", () => {
                // Check for active-task class and remove all others
                if (!task.classList.contains("active-task")) {
                    taskItems.forEach((task) => {
                        task.classList.remove("active-task");
                    });
                    // Add new active-task class
                    task.classList.add("active-task");
                };
            });
        });
    });
};

// Edit task handler
function taskEditHandler(task) {
    const newTitle = prompt("Enter new task title:");
    const newDescription = prompt("Enter new task description");
    const newDueDate = prompt("Enter new task due date:");
    const newPriority = prompt("Enter new priority");
    task.editTask(newTitle, newDescription, newDueDate, newPriority);
    renderTasks();
};

// Delete task handler
function taskDeleteHandler(todoIndex, taskIndex) {
    TodoList.getTodos()[todoIndex].tasks[taskIndex].deleteTask(todoIndex, taskIndex);
    renderTasks();
};

// RENDER INFO
function renderInfo() {
    infoContainer.innerHTML = "";
};

export { renderTodos, renderTasks, renderInfo };