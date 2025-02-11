// script.js

// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskText => addTaskToDOM(taskText));
});

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  addTaskToDOM(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
}

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');
  checkbox.addEventListener('change', () => toggleCompletion(listItem));

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.addEventListener('click', () => deleteTask(listItem));

  listItem.appendChild(checkbox);
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);

  taskList.appendChild(listItem);
}

// Function to save tasks to localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(task) {
  task.remove();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(taskText => task.querySelector('span').textContent !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Function to toggle task completion
function toggleCompletion(task) {
  task.classList.toggle('completed');
}

// Clear completed tasks
clearCompletedBtn.addEventListener('click', () => {
  const completedTasks = taskList.querySelectorAll('.task-item.completed');
  completedTasks.forEach(task => deleteTask(task));
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
