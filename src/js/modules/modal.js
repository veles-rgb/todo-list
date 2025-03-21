// modal.js
import { renderTasks, renderTodos, renderInfo } from "./dom.js";
import { format, parse, formatDistance } from "date-fns";
import Task from "./task.js";
import TodoList from "./todo.js";
import { storeTodos } from "./storage.js";

// Add todo modal
function createAddTodoModal() {
    // Create modal
    const addTodoModal = document.createElement("dialog");
    addTodoModal.classList.add("add-todo-modal");
    // Create form
    const addTodoForm = document.createElement("form");
    addTodoForm.setAttribute("id", "add-todo-form");
    // Create a div for closeBtn and title
    const closeAndTitle = document.createElement("div");
    closeAndTitle.classList.add("modal-close-title");
    // Create close btn
    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => addTodoModal.close());
    // Create modal title
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Add a Todo";
    // Create name label
    const todoNameLabel = document.createElement("label");
    todoNameLabel.htmlFor = "add-todo-name";
    todoNameLabel.textContent = "Enter todo name";
    // Create name input
    const todoNameInput = document.createElement("input");
    todoNameInput.type = "text";
    todoNameInput.name = "add-todo-name";
    todoNameInput.maxLength = "30";
    todoNameInput.setAttribute("id", "add-todo-name");
    todoNameInput.setAttribute("required", "true");
    // Create submit btn
    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Add";
    // Append elements
    document.body.appendChild(addTodoModal);
    addTodoModal.appendChild(closeAndTitle);
    closeAndTitle.appendChild(modalTitle);
    closeAndTitle.appendChild(modalCloseBtn);
    addTodoModal.appendChild(addTodoForm);
    addTodoForm.appendChild(todoNameLabel);
    addTodoForm.appendChild(todoNameInput);
    addTodoForm.appendChild(submitBtn);
    addTodoModal.showModal();
    // Form submit btn event listener
    addTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const todoName = formData.get("add-todo-name");
        TodoList.addTodo(todoName, "Incomplete");
        renderTodos();
        const todoItems = document.querySelectorAll(".todo-item");
        const newestTodo = todoItems[todoItems.length - 1];
        newestTodo.classList.add("active-todo");
        renderTasks();
        renderInfo();
        addTodoModal.close();

        storeTodos();
    });
};

// Edit todo modal
function createEditTodoModal(index) {
    const todo = TodoList.getTodos()[index];
    // Create modal
    const editTodoModal = document.createElement("dialog");
    editTodoModal.classList.add("edit-todo-modal");
    // Create form
    const editTodoForm = document.createElement("form");
    editTodoForm.setAttribute("id", "edit-todo-form");
    // Create a div for closeBtn and title
    const closeAndTitle = document.createElement("div");
    closeAndTitle.classList.add("modal-close-title");
    // Create close btn
    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => editTodoModal.close());
    // Create modal title
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Edit Todo";
    // Create name label
    const todoNameLabel = document.createElement("label");
    todoNameLabel.htmlFor = "new-todo-name";
    todoNameLabel.textContent = "Enter new name";
    // Create name input
    const todoNameInput = document.createElement("input");
    todoNameInput.type = "text";
    todoNameInput.name = "new-todo-name";
    todoNameInput.setAttribute("id", "new-todo-name")
    todoNameInput.setAttribute("required", "true");
    todoNameInput.maxLength = "30";
    todoNameInput.value = todo.name;
    // Create form submit btn
    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Edit";
    // Append elements
    document.body.appendChild(editTodoModal);
    editTodoModal.appendChild(closeAndTitle);
    closeAndTitle.appendChild(modalTitle);
    closeAndTitle.appendChild(modalCloseBtn);
    editTodoModal.appendChild(editTodoForm);
    editTodoForm.appendChild(todoNameLabel);
    editTodoForm.appendChild(todoNameInput);
    editTodoForm.appendChild(submitBtn);
    editTodoModal.showModal();
    // Submit btn event listener
    editTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newName = formData.get("new-todo-name");
        todo.editTodo(newName);
        renderTodos();
        const todoItems = document.querySelectorAll(".todo-item");
        const editedTodo = todoItems[index];
        editedTodo.classList.add("active-todo");
        renderTasks();
        renderInfo();
        editTodoModal.close();

        storeTodos();
    });
};

// Add task modal
function createAddTaskModal(todoIndex) {
    // Create modal
    const addTaskModal = document.createElement("dialog");
    addTaskModal.classList.add("add-task-modal");
    // Create form
    const addTaskForm = document.createElement("form");
    addTaskForm.setAttribute("id", "add-task-form");
    // Create a div for closeBtn and title
    const closeAndTitle = document.createElement("div");
    closeAndTitle.classList.add("modal-close-title");
    // Create close btn
    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => addTaskModal.close());
    // Create modal title
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Add a Task";
    // Create title label
    const taskTitleLabel = document.createElement("label")
    taskTitleLabel.htmlFor = "task-title";
    taskTitleLabel.textContent = "Name";
    // Create title input
    const taskTitleInput = document.createElement("input")
    taskTitleInput.type = "text";
    taskTitleInput.name = "task-title";
    taskTitleInput.maxLength = "20"
    taskTitleInput.setAttribute("id", "task-title");
    taskTitleInput.setAttribute("required", "true");
    // Create description label
    const taskDescLabel = document.createElement("label");
    taskDescLabel.htmlFor = "task-desc";
    taskDescLabel.textContent = "Description";
    // Create description input
    const taskDescInput = document.createElement("input");
    taskDescInput.type = "text";
    taskDescInput.name = "task-desc";
    taskDescInput.maxLength = "100";
    taskDescInput.setAttribute("id", "task-desc");
    // Create due date label
    const taskDueLabel = document.createElement("label");
    taskDueLabel.htmlFor = "task-due";
    taskDueLabel.textContent = "Due Date";
    // Create due date input (datetime-local)
    const taskDueInput = document.createElement("input");
    taskDueInput.type = "datetime-local";
    taskDueInput.name = "task-due";
    taskDueInput.setAttribute("id", "task-due");
    taskDueInput.setAttribute("required", "true");
    // Create task priority label
    const taskPrioLabel = document.createElement("label");
    taskPrioLabel.htmlFor = "task-prio";
    taskPrioLabel.textContent = "Task Priority";
    // Create task priority selection dropdown
    const taskPrioInput = document.createElement("select");
    taskPrioInput.name = "task-prio";
    taskPrioInput.setAttribute("id", "task-prio");
    taskPrioInput.setAttribute("required", "true");
    // Priority option 1 (low)
    const taskPrioOption1 = document.createElement("option");
    taskPrioOption1.classList.add("prio-option-low")
    taskPrioOption1.value = "!";
    taskPrioOption1.textContent = "!";
    taskPrioInput.appendChild(taskPrioOption1);
    // Priority option 2 (medium)
    const taskPrioOption2 = document.createElement("option");
    taskPrioOption2.classList.add("prio-option-medium");
    taskPrioOption2.value = "!!";
    taskPrioOption2.textContent = "!!";
    taskPrioInput.appendChild(taskPrioOption2);
    // Priority option 3 (high)
    const taskPrioOption3 = document.createElement("option");
    taskPrioOption3.classList.add("prio-option-high");
    taskPrioOption3.value = "!!!";
    taskPrioOption3.textContent = "!!!";
    taskPrioInput.appendChild(taskPrioOption3);
    // Create form submit button
    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Add";
    // Append elements
    document.body.appendChild(addTaskModal);
    addTaskModal.appendChild(closeAndTitle);
    closeAndTitle.appendChild(modalTitle);
    closeAndTitle.appendChild(modalCloseBtn);
    addTaskModal.appendChild(addTaskForm);
    addTaskForm.appendChild(taskTitleLabel);
    addTaskForm.appendChild(taskTitleInput);
    addTaskForm.appendChild(taskDescLabel);
    addTaskForm.appendChild(taskDescInput);
    addTaskForm.appendChild(taskDueLabel);
    addTaskForm.appendChild(taskDueInput);
    addTaskForm.appendChild(taskPrioLabel);
    addTaskForm.appendChild(taskPrioInput);
    addTaskForm.appendChild(submitBtn);
    addTaskModal.showModal();
    // Submit btn event listener
    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskTitle = formData.get("task-title");
        const taskDesc = formData.get("task-desc");
        const taskDue = formData.get("task-due");
        const taskPrio = formData.get("task-prio");

        // Regex for validating the datetime-local format (YYYY-MM-DDTHH:MM)
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        // Check if the taskDue value matches the required format
        if (!regex.test(taskDue)) {
            alert("Please enter a valid date-time format (YYYY-MM-DDTHH:MM)!");
            return; // Stop form submission if the format is invalid
        };
        // Create mew task element
        TodoList.getTodos()[todoIndex].tasks.push(new Task(taskTitle, taskDesc, taskDue, taskPrio));
        // Set default incomplete task
        TodoList.getTodos()[todoIndex].status = "Incomplete";
        // Re-add active todo
        renderTodos();
        const todoItems = document.querySelectorAll(".todo-item");
        if (!todoItems[todoIndex].classList.contains("active-todo")) {
            todoItems.forEach((item) => {
                item.classList.remove("active-todo");
            });
            todoItems[todoIndex].classList.add("active-todo");
        };
        // Add active task to new task
        renderTasks();
        const taskItems = document.querySelectorAll(".task-item");
        const newestTask = taskItems[taskItems.length - 1];
        newestTask.classList.add("active-task");
        renderInfo();
        addTaskModal.remove();

        storeTodos();
    });
};

// Edit task modal
function createEditTaskModal(task, taskIndex) {
    // Create modal
    const editTaskModal = document.createElement("dialog");
    editTaskModal.classList.add("edit-task-modal");
    // Create form
    const editTaskForm = document.createElement("form");
    editTaskForm.setAttribute("id", "edit-task-form");
    // Create a div for closeBtn and title
    const closeAndTitle = document.createElement("div");
    closeAndTitle.classList.add("modal-close-title");
    // Create close btn
    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => editTaskModal.close());
    // Create modal title
    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Edit Task";
    // Create title label
    const taskTitleLabel = document.createElement("label")
    taskTitleLabel.htmlFor = "task-title";
    taskTitleLabel.textContent = "Name";
    // Create title input
    const taskTitleInput = document.createElement("input")
    taskTitleInput.type = "text";
    taskTitleInput.name = "task-title";
    taskTitleInput.maxLength = "20";
    taskTitleInput.setAttribute("id", "task-title");
    taskTitleInput.setAttribute("required", "true");
    taskTitleInput.value = task.title;
    // Create description label
    const taskDescLabel = document.createElement("label");
    taskDescLabel.htmlFor = "task-desc";
    taskDescLabel.textContent = "Description";
    // Create description input
    const taskDescInput = document.createElement("input");
    taskDescInput.type = "text";
    taskDescInput.name = "task-desc";
    taskDescInput.maxLength = "100";
    taskDescInput.setAttribute("id", "task-desc");
    taskDescInput.value = task.description;
    // Create due date label
    const taskDueLabel = document.createElement("label");
    taskDueLabel.htmlFor = "task-due";
    taskDueLabel.textContent = "Due Date";
    // Create due date input
    const taskDueInput = document.createElement("input");
    taskDueInput.type = "datetime-local";
    taskDueInput.name = "task-due";
    taskDueInput.setAttribute("required", "true");
    taskDueInput.setAttribute("id", "task-due");
    taskDueInput.value = task.dueDate;
    // Create task priority label
    const taskPrioLabel = document.createElement("label");
    taskPrioLabel.htmlFor = "task-prio";
    taskPrioLabel.textContent = "Task Priority";
    // Create task priority selection dropdown
    const taskPrioInput = document.createElement("select");
    taskPrioInput.name = "task-prio";
    taskPrioInput.setAttribute("id", "task-prio");
    taskPrioInput.setAttribute("required", "true");
    // Priority option 1 (low)
    const taskPrioOption1 = document.createElement("option");
    taskPrioOption1.value = "!";
    taskPrioOption1.textContent = "!";
    taskPrioInput.appendChild(taskPrioOption1);
    // Priority option 2 (medium)
    const taskPrioOption2 = document.createElement("option");
    taskPrioOption2.value = "!!";
    taskPrioOption2.textContent = "!!";
    taskPrioInput.appendChild(taskPrioOption2);
    // Priority option 3 (high)
    const taskPrioOption3 = document.createElement("option");
    taskPrioOption3.value = "!!!";
    taskPrioOption3.textContent = "!!!";
    taskPrioInput.appendChild(taskPrioOption3);
    taskPrioInput.value = task.priority;
    // Create form submit btn
    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Edit";
    // Append elements
    document.body.appendChild(editTaskModal);
    editTaskModal.appendChild(closeAndTitle);
    closeAndTitle.appendChild(modalTitle);
    closeAndTitle.appendChild(modalCloseBtn);
    editTaskModal.appendChild(editTaskForm);
    editTaskForm.appendChild(taskTitleLabel);
    editTaskForm.appendChild(taskTitleInput);
    editTaskForm.appendChild(taskDescLabel);
    editTaskForm.appendChild(taskDescInput);
    editTaskForm.appendChild(taskDueLabel);
    editTaskForm.appendChild(taskDueInput);
    editTaskForm.appendChild(taskPrioLabel);
    editTaskForm.appendChild(taskPrioInput);
    editTaskForm.appendChild(submitBtn);
    editTaskModal.showModal();
    // Form submit event listener
    editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskTitle = formData.get("task-title");
        const taskDesc = formData.get("task-desc");
        const taskDue = formData.get("task-due");
        const taskPrio = formData.get("task-prio");

        // Regex for validating the datetime-local format (YYYY-MM-DDTHH:MM)
        const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        // Check if the taskDue value matches the required format
        if (!regex.test(taskDue)) {
            alert("Please enter a valid date-time format (YYYY-MM-DDTHH:MM)!");
            return; // Stop form submission if the format is invalid
        };
        // Use editTask method
        task.editTask(taskTitle, taskDesc, taskDue, taskPrio);
        // Re-add active task to edited task
        renderTasks();
        const taskItems = document.querySelectorAll(".task-item");
        taskItems[taskIndex].classList.add("active-task");
        renderInfo();
        editTaskModal.close();
    });
};

export { createAddTodoModal, createEditTodoModal, createAddTaskModal, createEditTaskModal };