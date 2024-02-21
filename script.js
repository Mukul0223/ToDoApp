let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();
  if (taskName !== "") {
    const task = { id: Date.now(), name: taskName, completed: false };
    tasks.push(task);
    taskInput.value = "";
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    li.className = task.completed ? "completed" : "";
    li.onclick = () => toggleTaskCompletion(task.id);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    };
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
};
