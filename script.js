const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");
const taskCount = document.getElementById("task-count");
const clearAllBtn = document.getElementById("clear-all");

let isDragging = false;

// Add a new task to the list
function addTask() {
    const text = inputBox.value.trim();

    if (text === "") {
        inputBox.focus();
        return;
    }

    // Remove empty placeholder message if present
    const emptyMsg = listContainer.querySelector(".empty-msg");
    if (emptyMsg) {
        emptyMsg.remove();
    }

    const li = document.createElement("li");
    li.textContent = text;
    li.setAttribute("draggable", "true");

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.className = "delete-btn";
    span.title = "Delete task";
    span.setAttribute("draggable", "false");
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    inputBox.focus();

    saveData();
    updateFooter();
}

// Handle clicking on tasks (toggle complete) or the delete button
listContainer.addEventListener("click", function (e) {
    if (isDragging) return;

    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateFooter();
    } else if (e.target.classList.contains("delete-btn")) {
        const li = e.target.parentElement;
        li.classList.add("fade-out");
        setTimeout(function () {
            li.remove();
            saveData();
            updateFooter();
        }, 220);
    }
});

// ==========================================================================
// Drag and Drop (Desktop HTML5 & Mobile Touch)
// ==========================================================================

// Desktop: Drag Start
listContainer.addEventListener("dragstart", function (e) {
    const li = e.target.closest("li");
    if (!li || e.target.classList.contains("delete-btn")) {
        e.preventDefault();
        return;
    }

    isDragging = true;
    li.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    // Required for Firefox compatibility
    e.dataTransfer.setData("text/plain", "");
});

// Desktop: Drag End
listContainer.addEventListener("dragend", function (e) {
    const li = e.target.closest("li");
    if (li) {
        li.classList.remove("dragging");
    }
    setTimeout(function () {
        isDragging = false;
    }, 60);
    saveData();
});

// Drag Over (Reordering logic)
listContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
    const draggingItem = listContainer.querySelector(".dragging");
    if (!draggingItem) return;

    const afterElement = getDragAfterElement(listContainer, e.clientY);
    if (afterElement == null) {
        listContainer.appendChild(draggingItem);
    } else if (afterElement !== draggingItem) {
        listContainer.insertBefore(draggingItem, afterElement);
    }
});

listContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    saveData();
});

// Helper: Determine closest task element based on vertical pointer position
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

    return draggableElements.reduce(function (closest, child) {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Mobile Touch Support for Drag and Drop
let touchItem = null;

listContainer.addEventListener("touchstart", function (e) {
    const li = e.target.closest("li");
    if (!li || e.target.classList.contains("delete-btn")) return;
    touchItem = li;
}, { passive: true });

listContainer.addEventListener("touchmove", function (e) {
    if (!touchItem) return;
    const touch = e.touches[0];

    if (!touchItem.classList.contains("dragging")) {
        touchItem.classList.add("dragging");
        isDragging = true;
    }

    const afterElement = getDragAfterElement(listContainer, touch.clientY);
    if (afterElement == null) {
        listContainer.appendChild(touchItem);
    } else if (afterElement !== touchItem) {
        listContainer.insertBefore(touchItem, afterElement);
    }
}, { passive: true });

listContainer.addEventListener("touchend", function () {
    if (touchItem) {
        touchItem.classList.remove("dragging");
        setTimeout(function () {
            isDragging = false;
        }, 60);
        touchItem = null;
        saveData();
    }
});

// ==========================================================================
// Keyboard & General Events
// ==========================================================================

// Allow adding tasks with the Enter key
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add button click
addBtn.addEventListener("click", addTask);

// Clear all tasks
clearAllBtn.addEventListener("click", function () {
    const items = listContainer.querySelectorAll("li");
    if (items.length === 0) return;

    if (confirm("Clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
        updateFooter();
    }
});

// Update the task counter and show/hide empty placeholder
function updateFooter() {
    const allItems = listContainer.querySelectorAll("li");
    const activeItems = listContainer.querySelectorAll("li:not(.checked)");

    if (taskCount) {
        const count = activeItems.length;
        taskCount.textContent = count === 1 ? "1 task left" : `${count} tasks left`;
    }

    let emptyMsg = listContainer.querySelector(".empty-msg");
    if (allItems.length === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement("div");
            emptyMsg.className = "empty-msg";
            emptyMsg.textContent = "No tasks yet! Add one above ✍️";
            listContainer.appendChild(emptyMsg);
        }
    } else if (emptyMsg) {
        emptyMsg.remove();
    }
}

// Save list items to localStorage (cleans up any active dragging or fade classes)
function saveData() {
    const clone = listContainer.cloneNode(true);
    clone.querySelectorAll("li").forEach(function (li) {
        li.classList.remove("dragging", "fade-out");
        li.setAttribute("draggable", "true");
    });
    localStorage.setItem("todo_list_items", clone.innerHTML);
}

// Load saved tasks or setup starter tasks
function showTask() {
    const saved = localStorage.getItem("todo_list_items");

    if (saved) {
        listContainer.innerHTML = saved;
        // Ensure all loaded li elements are draggable
        listContainer.querySelectorAll("li").forEach(function (li) {
            li.setAttribute("draggable", "true");
            const span = li.querySelector(".delete-btn");
            if (span) {
                span.setAttribute("draggable", "false");
            }
        });
    } else {
        // Friendly initial tasks for first visit
        const starterTasks = [
            { text: "Welcome to your To-do list! 👋", checked: false },
            { text: "Drag and drop tasks to reorder them ↕️", checked: false },
            { text: "Click on any task to mark it done", checked: true },
            { text: "Click the × on the right to delete", checked: false }
        ];

        starterTasks.forEach(function (task) {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.setAttribute("draggable", "true");

            if (task.checked) {
                li.classList.add("checked");
            }

            const span = document.createElement("span");
            span.innerHTML = "\u00d7";
            span.className = "delete-btn";
            span.title = "Delete task";
            span.setAttribute("draggable", "false");
            li.appendChild(span);

            listContainer.appendChild(li);
        });

        saveData();
    }

    updateFooter();
}

showTask();
