// dom.js
import TodoList from "./todo.js";
import { createAddTodoModal, createEditTodoModal, createAddTaskModal, createEditTaskModal } from "./modal.js";
const todoContainer = document.getElementById("todo-container");
const addTodoBtn = document.getElementById("add-todo");
const taskContainer = document.getElementById("task-container");
const infoContainer = document.getElementById("info-container");

// RENDER TODOS (left container)
function renderTodos() {
    todoContainer.innerHTML = "";

    TodoList.getTodos().forEach((todo, todoIndex) => {
        // Create todo element div
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo-item");
        todoElement.dataset.index = todoIndex;
        // Create todo name
        const todoName = document.createElement("p")
        todoName.classList.add("todo-item-name");
        todoName.textContent = todo.name;
        // Create todo.status
        const todoStatus = document.createElement("p");
        todoStatus.classList.add("todo-item-status");
        todoStatus.textContent = todo.status;
        // Create edit todo btn
        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.classList.add("edit-todo-btn")
        editBtn.addEventListener("click", () => createEditTodoModal(todoIndex));
        // Create delete todo btn
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add("delete-todo-btn")
        deleteBtn.addEventListener("click", () => TodoDeleteHandler(todoIndex));
        // Append elements
        todoElement.appendChild(todoName);
        todoElement.appendChild(todoStatus);
        todoElement.appendChild(editBtn);
        todoElement.appendChild(deleteBtn);
        todoContainer.appendChild(todoElement);
    });
    // Todo item eventListener
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Check for active-todo class and remove all others
            if (!item.classList.contains("active-todo")) {
                todoItems.forEach((item) => {
                    item.classList.remove("active-todo");
                });
                // Add new active-todo class
                item.classList.add("active-todo");
                renderTasks();
                renderInfo();
            };
        });
    });
};

// Delete Todo
function TodoDeleteHandler(index) {
    if (confirm("Are you sure you want to delete this todo?")) {
        TodoList.deleteTodo(TodoList.getTodos()[index]);
        renderTodos();
        renderTasks();
        renderInfo();
    };
};

// AddTodoBtn event listener (open modal)
addTodoBtn.addEventListener("click", () => {
    createAddTodoModal();
});

// RENDER TASKS (middle container)
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
                createAddTaskModal(todoIndex);
            });
            // Create task elements
            TodoList.getTodos()[todoIndex].tasks.forEach((task, taskIndex) => {
                // Create task divs
                const taskElement = document.createElement("div");
                taskElement.classList.add("task-item");
                taskElement.dataset.index = taskIndex;
                // Create checkbox item
                const taskCheckbox = document.createElement("input");
                taskCheckbox.type = "checkbox";
                taskCheckbox.setAttribute("id", `cb-${taskIndex}`);
                taskCheckbox.classList.add("task-checkbox");
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
                editBtn.addEventListener("click", () => taskEditHandler(task, taskIndex));
                // Add delete task btn
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "🗑";
                deleteBtn.classList.add("delete-task-btn");
                deleteBtn.addEventListener("click", () => taskDeleteHandler(todoIndex, taskIndex));
                // Change task.status upon being checked/unchecked
                taskCheckbox.addEventListener("change", () => {
                    if (taskCheckbox.checked) {
                        task.status = "Completed";
                    } else {
                        task.status = "Incomplete";
                    };
                    // If all checkboxes are checked change Todo status to complete
                    const taskCheckboxes = document.querySelectorAll(".task-checkbox");
                    const allChecked = [...taskCheckboxes].every(checkbox => checkbox.checked);
                    TodoList.getTodos()[todoIndex].status = allChecked ? "Completed" : "Incomplete";
                    renderTodos();
                    const todoItems = document.querySelectorAll(".todo-item");
                    todoItems[todoIndex].classList.add("active-todo");
                    renderInfo();
                });
                // Update checked if status completed (for re-render)
                if (task.status === "Completed") {
                    taskCheckbox.checked = true;
                };

                // Append new task elements
                taskContainer.appendChild(taskElement);
                taskElement.appendChild(taskCheckbox);
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
                    renderInfo();
                };
            });
        });
    });
};

// Edit task handler
function taskEditHandler(task, taskIndex) {
    createEditTaskModal(task, taskIndex);
};

// Delete task handler
function taskDeleteHandler(todoIndex, taskIndex) {
    if (confirm("Are you sure you want to delete this task?")) {
        TodoList.getTodos()[todoIndex].tasks[taskIndex].deleteTask(todoIndex, taskIndex);
        renderTasks();
        renderInfo();
    };
};

// RENDER INFO (right-container)
function renderInfo() {
    infoContainer.innerHTML = "";
    const todoItems = document.querySelectorAll(".todo-item");
    const taskItems = document.querySelectorAll(".task-item")
    // Loop through todos in DOM with index
    todoItems.forEach((todo, todoIndex) => {
        // Find active todo in DOM
        if (todo.classList.contains("active-todo")) {
            // Loop through TodoList array with DOM todo index & get tasks with task index
            TodoList.getTodos()[todoIndex].tasks.forEach((task, taskIndex) => {
                // Find active task in DOM using task index
                if (taskItems[taskIndex].classList.contains("active-task")) {
                    // Create info DOM elements
                    // Create task status display
                    const infoStatus = document.createElement("h3");
                    infoStatus.classList.add("info-status");
                    infoStatus.textContent = task.status;
                    // Create task title display
                    const infoTitle = document.createElement("h2");
                    infoTitle.classList.add("info-title");
                    infoTitle.textContent = task.title;
                    // Create task info display
                    const infoDesc = document.createElement("p");
                    infoDesc.classList.add("info-desc");
                    infoDesc.textContent = task.description;
                    // Create textarea for task.notes
                    const infoNotesLabel = document.createElement("p");
                    infoNotesLabel.textContent = "Notes";
                    const infoNotes = document.createElement("textarea");
                    infoNotes.classList.add("info-notes");
                    infoNotes.textContent = task.notes;
                    // Add event listener to update notes (task.notes and textarea)
                    infoNotes.addEventListener("input", updateNotes)
                    function updateNotes(e) {
                        infoNotes.textContent = e.target.value;
                        task.notes = e.target.value;
                    };
                    // Create task dueDate display
                    const infoDue = document.createElement("p");
                    infoDue.classList.add("info-due");
                    infoDue.textContent = task.dueDate;
                    // Create task priority display
                    const infoPrio = document.createElement("p");
                    infoPrio.classList.add("info-prio");
                    infoPrio.textContent = task.priority;
                    // Create edit task button
                    const editBtn = document.createElement("button");
                    editBtn.textContent = "✎";
                    editBtn.classList.add("edit-task-btn");
                    editBtn.addEventListener("click", () => createEditTaskModal(task, taskIndex));
                    // Create delete task button
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "🗑";
                    deleteBtn.classList.add("delete-task-btn");
                    // Add delete task functionality
                    deleteBtn.addEventListener("click", () => {
                        taskDeleteHandler(todoIndex, taskIndex);
                    });
                    // Append elements
                    infoContainer.appendChild(infoStatus);
                    infoContainer.appendChild(infoTitle);
                    infoContainer.appendChild(infoPrio);
                    infoContainer.appendChild(infoDesc);
                    infoContainer.appendChild(infoNotesLabel);
                    infoContainer.appendChild(infoNotes);
                    infoContainer.appendChild(infoDue);
                    infoContainer.appendChild(editBtn);
                    infoContainer.appendChild(deleteBtn);
                };
            });
        };
    });
};

export { renderTodos, renderTasks, renderInfo };