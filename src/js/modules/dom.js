// dom.js
import TodoList from "./todo.js";
import { createAddTodoModal, createEditTodoModal, createAddTaskModal, createEditTaskModal } from "./modal.js";
import { format, parse, formatDistance, differenceInSeconds } from "date-fns";
import { storeTodos } from "./storage.js";
const contentLeft = document.getElementById("content-left");
const todoContainer = document.getElementById("todo-container");
const contentMiddle = document.getElementById("content-middle");
const taskContainer = document.getElementById("task-container");
const contentRight = document.getElementById("content-right");
const infoContainer = document.getElementById("info-container");

// RENDER TODOS (left container)
function renderTodos() {
    todoContainer.innerHTML = "";

    contentLeft.appendChild(todoContainer);

    // Create add todo btn
    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("add-todo-btn");
    addTodoBtn.setAttribute("id", "add-todo");
    addTodoBtn.textContent = "Add Todo";
    // Attach event listener right here!
    addTodoBtn.addEventListener("click", () => {
        createAddTodoModal();
    });

    todoContainer.appendChild(addTodoBtn);

    TodoList.getTodos().forEach((todo, todoIndex) => {
        // Create todo element div
        const todoElement = document.createElement("div");
        todoElement.classList.add("todo-item");
        todoElement.dataset.index = todoIndex;
        // Create todo name
        const todoName = document.createElement("p");
        todoName.classList.add("todo-item-name");
        todoName.textContent = todo.name;
        // Create todo.status
        const todoStatus = document.createElement("p");
        todoStatus.classList.add("todo-item-status");
        todoStatus.textContent = todo.status;
        if (todo.tasks.length === 0) {
            todoStatus.classList.add("empty-todo");
            todoStatus.classList.remove("completed-todo");
            todoStatus.classList.remove("incomplete-todo");
            todoStatus.textContent = "Empty";
        } else if (todo.status === "Incomplete") {
            todoStatus.classList.add("incomplete-todo");
            todoStatus.classList.remove("completed-todo");
        } else if (todo.status === "Completed") {
            todoStatus.classList.add("completed-todo");
            todoStatus.classList.remove("incomplete-todo");
        };
        // Create buttons div
        const todoBtns = document.createElement("div");
        todoBtns.classList.add("todo-buttons");
        // Create edit todo btn
        const editBtn = document.createElement("button");
        editBtn.textContent = "✎";
        editBtn.classList.add("edit-todo-btn");
        editBtn.addEventListener("click", () => createEditTodoModal(todoIndex));
        // Create delete todo btn
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-todo-btn");
        deleteBtn.addEventListener("click", () => TodoDeleteHandler(todoIndex));
        // Append elements
        todoElement.appendChild(todoName);
        todoElement.appendChild(todoStatus);
        todoElement.appendChild(todoBtns);
        todoBtns.appendChild(editBtn);
        todoBtns.appendChild(deleteBtn);
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
        storeTodos();
    };
};

// RENDER TASKS (middle container)
function renderTasks() {
    contentMiddle.innerHTML = "";
    taskContainer.innerHTML = "";

    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item, todoIndex) => {
        if (item.classList.contains("active-todo")) {
            // Render content middle
            contentMiddle.style.display = "block";
            // Create content middle section title
            const sectionTitle = document.createElement("h1");
            sectionTitle.classList.add("section-title");
            sectionTitle.textContent = `Tasks (${TodoList.getTodos()[todoIndex].name})`;
            // Create add task btn
            const addTaskBtn = document.createElement("button");
            addTaskBtn.textContent = "Add task";
            addTaskBtn.setAttribute("id", "#add-task");
            addTaskBtn.classList.add("add-task-btn");
            taskContainer.appendChild(addTaskBtn);
            // addTaskBtn event listener (add to active todo's tasks)
            addTaskBtn.addEventListener("click", () => {
                createAddTaskModal(todoIndex);
            });
            contentMiddle.appendChild(sectionTitle);
            contentMiddle.appendChild(taskContainer);
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
                const shortDescription = task.description.slice(0, 11);
                taskDesc.textContent = `${shortDescription}...`;
                // Create task dueDate
                const taskDue = document.createElement("p");
                taskDue.classList.add("task-item-due");
                // Get dueDate in date-fns formatDistance (ex: 1 hour 23 minutes...)
                const now = new Date(Date.now());
                const dueDate = new Date(task.dueDate);
                // Get the difference in seconds
                const diffSeconds = differenceInSeconds(dueDate, now);
                // Format the distance
                let resultDate = formatDistance(now, dueDate, { includeSeconds: true });
                // If the date has passed, add "ago" to the end
                if (diffSeconds < 0) {
                    resultDate = `${resultDate} ago`;
                }
                taskDue.textContent = resultDate;
                // Create task priority
                if (task.priority === "!") {
                    taskElement.classList.add("prio-low");
                } else if (task.priority === "!!") {
                    taskElement.classList.add("prio-medium");
                } else if (task.priority === "!!!") {
                    taskElement.classList.add("prio-high");
                };
                // Create buttons div
                const taskButtons = document.createElement("div");
                taskButtons.classList.add("task-buttons");
                // Add edit task btn
                const editBtn = document.createElement("button");
                editBtn.textContent = "✎";
                editBtn.classList.add("edit-task-btn");
                editBtn.addEventListener("click", () => taskEditHandler(task, taskIndex));
                // Add delete task btn
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "X";
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
                    storeTodos();
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
                taskElement.appendChild(taskButtons);
                taskButtons.appendChild(editBtn);
                taskButtons.appendChild(deleteBtn);
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
        renderTodos();
        const todoItems = document.querySelectorAll(".todo-item");
        todoItems[todoIndex].classList.add("active-todo");
        renderTasks();
        renderInfo();
        storeTodos();
    };
};

// RENDER INFO (right-container)
function renderInfo() {
    contentRight.innerHTML = "";
    infoContainer.innerHTML = "";

    const todoItems = document.querySelectorAll(".todo-item");
    const taskItems = document.querySelectorAll(".task-item");
    // Loop through todos in DOM with index
    todoItems.forEach((todo, todoIndex) => {
        // Find active todo in DOM
        if (todo.classList.contains("active-todo")) {
            // Loop through TodoList array with DOM todo index & get tasks with task index
            TodoList.getTodos()[todoIndex].tasks.forEach((task, taskIndex) => {
                // Find active task in DOM using task index
                if (taskItems[taskIndex].classList.contains("active-task")) {
                    // Create info DOM elements
                    // Render content right
                    contentRight.style.display = "flex";
                    // Create content right section title
                    const sectionTitle = document.createElement("h1");
                    sectionTitle.classList.add("section-title");
                    sectionTitle.textContent = "Info";
                    // Create task status display
                    const infoStatus = document.createElement("h3");
                    infoStatus.classList.add("info-status");
                    infoStatus.textContent = task.status;
                    if (task.status === "Incomplete") {
                        infoStatus.classList.add("incomplete-task");
                        infoStatus.classList.remove("completed-task");
                    } else if (task.status === "Completed") {
                        infoStatus.classList.add("completed-task");
                        infoStatus.classList.remove("incomplete-task");
                    }
                    // Create title and desc div
                    const infoTitleDesc = document.createElement("div");
                    infoTitleDesc.classList.add("info-title-desc");
                    // Create task title and prio div
                    const infoTitlePrioDiv = document.createElement("div");
                    infoTitlePrioDiv.classList.add("info-title-prio");
                    // Create task title display
                    const infoTitle = document.createElement("h2");
                    infoTitle.classList.add("info-title");
                    infoTitle.textContent = task.title;
                    // Create task priority display
                    const infoPrio = document.createElement("p");
                    infoPrio.classList.add("info-prio");
                    infoPrio.textContent = `(${task.priority})`;
                    // Add Prio status class
                    if (task.priority === "!") {
                        infoPrio.classList.add("info-prio-low");
                    } else if (task.priority === "!!") {
                        infoPrio.classList.add("info-prio-medium");
                    } else if (task.priority === "!!!") {
                        infoPrio.classList.add("info-prio-high");
                    };
                    // Create task description display
                    const infoDesc = document.createElement("p");
                    infoDesc.classList.add("info-desc");
                    infoDesc.textContent = task.description;
                    // Create info notes label and textarea div
                    const infoNotesDiv = document.createElement("div");
                    infoNotesDiv.classList.add("info-notes-div");
                    // Create textarea for task.notes
                    const infoNotesLabel = document.createElement("p");
                    infoNotesLabel.classList.add("info-notes-label");
                    infoNotesLabel.textContent = "Task Notes";
                    const infoNotes = document.createElement("textarea");
                    infoNotes.maxLength = "2000";
                    infoNotes.classList.add("info-notes");
                    infoNotes.textContent = task.notes;
                    // Add event listener to update notes (task.notes and textarea)
                    infoNotes.addEventListener("input", updateNotes, storeTodos())
                    function updateNotes(e) {
                        infoNotes.textContent = e.target.value;
                        task.notes = e.target.value;
                        storeTodos();
                    };
                    // Create task dueDate label and display div
                    const dueDateAndLabel = document.createElement("div");
                    dueDateAndLabel.classList.add("due-date-div");
                    // Create task dueDate label
                    const infoDueLabel = document.createElement("p");
                    infoDueLabel.classList.add("info-due-label");
                    infoDueLabel.textContent = "Due Date";
                    // Create task dueDate display
                    const infoDue = document.createElement("p");
                    infoDue.classList.add("info-due");
                    const originalDate = task.dueDate;
                    const date = parse(originalDate, 'yyyy-MM-dd\'T\'HH:mm', new Date());
                    const dateResult = format(date, 'PPPp');
                    infoDue.textContent = dateResult;
                    // Create buttons div
                    const infoBtns = document.createElement("div");
                    infoBtns.classList.add("info-buttons");
                    // Create edit task button
                    const editBtn = document.createElement("button");
                    editBtn.textContent = "✎";
                    editBtn.classList.add("edit-task-btn");
                    editBtn.addEventListener("click", () => createEditTaskModal(task, taskIndex));
                    // Create delete task button
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "X";
                    deleteBtn.classList.add("delete-task-btn");
                    // Add delete task functionality
                    deleteBtn.addEventListener("click", () => {
                        taskDeleteHandler(todoIndex, taskIndex);
                    });
                    // Append elements
                    contentRight.appendChild(sectionTitle);
                    contentRight.appendChild(infoContainer);
                    infoContainer.appendChild(infoStatus);
                    infoContainer.appendChild(infoTitleDesc);
                    infoTitleDesc.appendChild(infoTitlePrioDiv)
                    infoTitlePrioDiv.appendChild(infoTitle);
                    infoTitlePrioDiv.appendChild(infoPrio);
                    infoTitleDesc.appendChild(infoDesc);
                    infoContainer.appendChild(infoNotesDiv)
                    infoNotesDiv.appendChild(infoNotesLabel);
                    infoNotesDiv.appendChild(infoNotes);
                    infoContainer.appendChild(dueDateAndLabel)
                    dueDateAndLabel.appendChild(infoDueLabel);
                    dueDateAndLabel.appendChild(infoDue);
                    infoContainer.appendChild(infoBtns);
                    infoBtns.appendChild(editBtn);
                    infoBtns.appendChild(deleteBtn);
                };
            });
        };
    });
};

export { renderTodos, renderTasks, renderInfo };