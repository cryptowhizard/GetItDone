// script.js

// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(taskText => addTaskToDOM(taskText));
});

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  // Check if the input is not empty
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Add the task to the DOM
  addTaskToDOM(taskText);

  // Save the task to localStorage
  saveTaskToLocalStorage(taskText);

  // Clear the input field
  taskInput.value = '';
}

// Function to add a task to the DOM
function addTaskToDOM(taskText) {
  // Create a new list item
  const listItem = document.createElement('li');
  listItem.className = 'task-item';

  // Create a span element to hold the task text
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Create a delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => deleteTask(listItem));

  // Append the span and delete button to the list item
  listItem.appendChild(taskSpan);
  listItem.appendChild(deleteBtn);

  // Append the list item to the task list
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

  // Remove the task from localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter(taskText => task.querySelector('span').textContent !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Optional: Add functionality to mark tasks as completed
taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    e.target.classList.toggle('completed');
  }
});
