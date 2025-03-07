import TodoList from "./todo.js";
import Task from "./task.js";
import todo from "./todo.js"; // REMOVE LATER

const todoContainer = document.getElementById("todo-container");
const addTodoBtn = document.getElementById("add-todo");
const taskContainer = document.getElementById("task-container");
const infoContainer = document.getElementById("info-container");

// RENDER TODOS
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

// RENDER INFO
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
                    const infoTitle = document.createElement("h2");
                    infoTitle.classList.add("info-title");
                    infoTitle.textContent = `${task.title} (${task.status})`;

                    const infoDesc = document.createElement("p");
                    infoDesc.classList.add("info-desc");
                    infoDesc.textContent = task.description;

                    const infoNotesLabel = document.createElement("p");
                    infoNotesLabel.textContent = "Notes";
                    const infoNotes = document.createElement("textarea");
                    infoNotes.classList.add("info-notes");
                    infoNotes.textContent = task.notes;

                    const infoDue = document.createElement("p");
                    infoDue.classList.add("info-due");
                    infoDue.textContent = task.dueDate;

                    const infoPrio = document.createElement("p");
                    infoPrio.classList.add("info-prio");
                    infoPrio.textContent = task.priority;

                    const editBtn = document.createElement("button");
                    editBtn.textContent = "✎";
                    editBtn.classList.add("edit-task-btn");
                    editBtn.addEventListener("click", () => createEditTaskModal(task, taskIndex));

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "🗑";
                    deleteBtn.classList.add("delete-task-btn");
                    deleteBtn.addEventListener("click", () => {
                        taskDeleteHandler(todoIndex, taskIndex);
                    });

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

// MODALS
// Add todo modal
function createAddTodoModal() {
    const addTodoModal = document.createElement("dialog");
    addTodoModal.classList.add("add-todo-modal");

    const addTodoForm = document.createElement("form");
    addTodoForm.setAttribute("id", "add-todo-form");

    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => addTodoModal.close());

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Add a Todo";

    const todoNameLabel = document.createElement("label");
    todoNameLabel.htmlFor = "add-todo-name";
    todoNameLabel.textContent = "Enter todo name";

    const todoNameInput = document.createElement("input");
    todoNameInput.type = "text";
    todoNameInput.name = "add-todo-name";
    todoNameInput.setAttribute("id", "add-todo-name")

    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Add";

    document.body.appendChild(addTodoModal);
    addTodoModal.appendChild(modalCloseBtn)
    addTodoModal.appendChild(modalTitle);
    addTodoModal.appendChild(addTodoForm)
    addTodoForm.appendChild(todoNameLabel);
    addTodoForm.appendChild(todoNameInput);
    addTodoForm.appendChild(submitBtn);
    addTodoModal.showModal();

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
    });
};

// Edit todo modal
function createEditTodoModal(index) {
    const todo = TodoList.getTodos()[index];

    const editTodoModal = document.createElement("dialog");
    editTodoModal.classList.add("edit-todo-modal");

    const editTodoForm = document.createElement("form");
    editTodoForm.setAttribute("id", "edit-todo-form");

    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => editTodoModal.close());

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Edit Todo";

    const todoNameLabel = document.createElement("label");
    todoNameLabel.htmlFor = "new-todo-name";
    todoNameLabel.textContent = "Enter new name";

    const todoNameInput = document.createElement("input");
    todoNameInput.type = "text";
    todoNameInput.name = "new-todo-name";
    todoNameInput.setAttribute("id", "new-todo-name")

    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Edit";

    document.body.appendChild(editTodoModal);
    editTodoModal.appendChild(modalCloseBtn);
    editTodoModal.appendChild(modalTitle);
    editTodoModal.appendChild(editTodoForm);
    editTodoForm.appendChild(todoNameLabel);
    editTodoForm.appendChild(todoNameInput);
    editTodoForm.appendChild(submitBtn);
    editTodoModal.showModal();

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
    });
};

// Add task modal
function createAddTaskModal(todoIndex) {
    const addTaskModal = document.createElement("dialog");
    addTaskModal.classList.add("add-task-modal");

    const addTaskForm = document.createElement("form");
    addTaskForm.setAttribute("id", "add-task-form");

    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => addTaskModal.close());

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Add a Task";

    const taskTitleLabel = document.createElement("label")
    taskTitleLabel.htmlFor = "task-title";
    taskTitleLabel.textContent = "Name";

    const taskTitleInput = document.createElement("input")
    taskTitleInput.type = "text";
    taskTitleInput.name = "task-title";
    taskTitleInput.setAttribute("id", "task-title");

    const taskDescLabel = document.createElement("label");
    taskDescLabel.htmlFor = "task-desc";
    taskDescLabel.textContent = "Description";

    const taskDescInput = document.createElement("input");
    taskDescInput.type = "text";
    taskDescInput.name = "task-desc";
    taskDescInput.setAttribute("id", "task-desc");

    const taskDueLabel = document.createElement("label");
    taskDueLabel.htmlFor = "task-due";
    taskDueLabel.textContent = "Due Date"

    const taskDueInput = document.createElement("input");
    taskDueInput.type = "text"; // Will change to calender
    taskDueInput.name = "task-due";
    taskDueInput.setAttribute("id", "task-due");

    const taskPrioLabel = document.createElement("label");
    taskPrioLabel.htmlFor = "task-prio";
    taskPrioLabel.textContent = "Task Priority";

    const taskPrioInput = document.createElement("input");
    taskPrioInput.type = "text"; // Will change to dropdown list (!, !!, !!!)
    taskPrioInput.name = "task-prio";
    taskPrioInput.setAttribute("id", "task-prio");

    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Add";

    document.body.appendChild(addTaskModal);
    addTaskModal.appendChild(modalCloseBtn);
    addTaskModal.appendChild(modalTitle);
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

    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskTitle = formData.get("task-title");
        const taskDesc = formData.get("task-desc");
        const taskDue = formData.get("task-due")
        const taskPrio = formData.get("task-prio");

        TodoList.getTodos()[todoIndex].tasks.push(new Task(taskTitle, taskDesc, taskDue, taskPrio));
        renderTasks();
        const taskItems = document.querySelectorAll(".task-item")
        const newestTask = taskItems[taskItems.length - 1];
        newestTask.classList.add("active-task");
        renderInfo();
        addTaskModal.close();
    });
};

// Edit task modal
function createEditTaskModal(task, taskIndex) {
    const editTaskModal = document.createElement("dialog");
    editTaskModal.classList.add("edit-task-modal");

    const editTaskForm = document.createElement("form");
    editTaskForm.setAttribute("id", "edit-task-form");

    const modalCloseBtn = document.createElement("button");
    modalCloseBtn.classList.add("modal-close-btn");
    modalCloseBtn.textContent = "X";
    modalCloseBtn.addEventListener("click", () => editTaskModal.close());

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = "Edit Task";

    const taskTitleLabel = document.createElement("label")
    taskTitleLabel.htmlFor = "task-title";
    taskTitleLabel.textContent = "Name";

    const taskTitleInput = document.createElement("input")
    taskTitleInput.type = "text";
    taskTitleInput.name = "task-title";
    taskTitleInput.setAttribute("id", "task-title");

    const taskDescLabel = document.createElement("label");
    taskDescLabel.htmlFor = "task-desc";
    taskDescLabel.textContent = "Description";

    const taskDescInput = document.createElement("input");
    taskDescInput.type = "text";
    taskDescInput.name = "task-desc";
    taskDescInput.setAttribute("id", "task-desc");

    const taskDueLabel = document.createElement("label");
    taskDueLabel.htmlFor = "task-due";
    taskDueLabel.textContent = "Due Date"

    const taskDueInput = document.createElement("input");
    taskDueInput.type = "text"; // Will change to calender
    taskDueInput.name = "task-due";
    taskDueInput.setAttribute("id", "task-due");

    const taskPrioLabel = document.createElement("label");
    taskPrioLabel.htmlFor = "task-prio";
    taskPrioLabel.textContent = "Task Priority";

    const taskPrioInput = document.createElement("input");
    taskPrioInput.type = "text"; // Will change to dropdown list (!, !!, !!!)
    taskPrioInput.name = "task-prio";
    taskPrioInput.setAttribute("id", "task-prio");

    const submitBtn = document.createElement("input");
    submitBtn.classList.add("modal-submit");
    submitBtn.type = "submit";
    submitBtn.value = "Edit";

    document.body.appendChild(editTaskModal);
    editTaskModal.appendChild(modalCloseBtn);
    editTaskModal.appendChild(modalTitle);
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

    editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskTitle = formData.get("task-title");
        const taskDesc = formData.get("task-desc");
        const taskDue = formData.get("task-due")
        const taskPrio = formData.get("task-prio");

        task.editTask(taskTitle, taskDesc, taskDue, taskPrio);
        renderTasks();
        const taskItems = document.querySelectorAll(".task-item");
        taskItems[taskIndex].classList.add("active-task");
        renderInfo();
        editTaskModal.close();
    });
};

export { renderTodos, renderTasks, renderInfo };