// todo.js

// 1️⃣ Var, Let, and Const
let tasks = [];  // Use let because we may change the value later

// 2️⃣ Hoisting: Function declarations are hoisted
loadTasks();  // Calling before declaration is fine because it's a function declaration

// 3️⃣ Lexical Scope: taskInput is available here because it's in the same scope
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// 4️⃣ Function Declaration vs. Function Expression
// Function Declaration (hoisted)
function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue) {
        tasks.push({ task: taskValue, completed: false });
        renderTasks();
        taskInput.value = '';  // Clear input field after adding task
    }
}

// Function Expression (not hoisted)
const removeTask = function(index) {
    tasks.splice(index, 1);  // Remove task at index
    renderTasks();
}

// 5️⃣ Arrow Functions
const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// 6️⃣ 'this' value in different contexts
addButton.addEventListener("click", () => addTask());  // Arrow function doesn't rebind 'this'

// 7️⃣ Call, Apply, and Bind
const filterTasks = function(type) {
    const filteredTasks = tasks.filter(task => {
        if (type === 'completed') return task.completed;
        if (type === 'pending') return !task.completed;
        return true;  // Show all
    });
    renderTasks(filteredTasks);
}

// 8️⃣ == vs ===
const isTaskCompleted = task => task.completed === true; // Using === for strict comparison

// 9️⃣ Event Bubbling and Event Capturing
taskList.addEventListener('click', (event) => {
    const index = event.target.dataset.index;
    if (event.target.classList.contains('remove-btn')) {
        removeTask(index);
    } else if (event.target.classList.contains('task-item')) {
        toggleTaskCompletion(index);
    }
}, true); // Use capture phase (captures before bubbling)

// 10️⃣ Event Delegation
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const index = event.target.parentElement.dataset.index;
        removeTask(index);
    }
})
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';  // Clear the list before rendering
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task-item');
        li.classList.toggle('completed', task.completed);
        li.dataset.index = index;
        li.textContent = task.task;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        li.appendChild(removeButton);

        taskList.appendChild(li);
    });
}

// Async and Await: Saving tasks to local storage
async function saveTasks() {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
}

// Load tasks from local storage on page load (async)
async function loadTasks() {
    try {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
            renderTasks();
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// 13️⃣ Microtasks vs Macrotasks: Event listeners (macrotask) vs saving to localStorage (microtask)
addButton.addEventListener("click", () => {
    addTask();
    saveTasks();  // Save tasks after adding new task (async)
});

// 14️⃣ Callback Function: Task removing callback
const addTaskWithCallback = (task, callback) => {
    tasks.push(task);
    callback();
};

// 15️⃣ Callback Hell: Nested callbacks (simplified with Promises)
const asyncAddTask = (task) => new Promise((resolve, reject) => {
    if (task) {
        tasks.push(task);
        resolve();
    } else {
        reject("Task cannot be empty");
    }
});

// 16️⃣ Promises
asyncAddTask({ task: 'Learn JS', completed: false })
    .then(() => renderTasks())
    .catch(error => console.log(error));

// 17️⃣ Async/Await in use for local storage operations
// (Already used above)

// 18️⃣ Shallow Copy vs. Deep Copy (example with spread operator)
const shallowCopyTasks = [...tasks];  // Shallow copy

// 19️⃣ Null, Undefined, NaN
let a = null;
let b;
let c = NaN;
console.log(a === null); // true
console.log(b === undefined); // true
console.log(isNaN(c)); // true

// 20️⃣ Higher-order functions
const mapTasks = (fn) => tasks.map(fn); // Map is a higher-order function

// 21️⃣ Pure function: no side effects, always returns the same result for same input
const filterCompleted = (task) => task.completed;

// 22️⃣ Immutability
const addTaskImmutable = (task) => [...tasks, task];  // New array, no mutation

// 23️⃣ typeof operator
console.log(typeof 42); // "number"
console.log(typeof 'string'); // "string"

// 24️⃣ Template Literals
const taskText = `Task: ${taskInput.value}`;

// 25️⃣ Destructuring
const [firstTask] = tasks;

// 26️⃣ Spread vs Rest
const newTask = { ...tasks[0] }; // Spread: creating a new object
const logRest = (...args) => console.log(args);  // Rest: collecting arguments

// 27️⃣ for, for...in, for...of
tasks.forEach((task) => console.log(task)); // Using forEach

// 28️⃣ Closure
function makeAdder(x) {
    return function(y) {
        return x + y;
    }
}
const add5 = makeAdder(5);
console.log(add5(3)); // 8

// 29️⃣ Currying
const multiply = (x) => (y) => x * y;
const multiplyBy2 = multiply(2);
console.log(multiplyBy2(5)); // 10

// 30️⃣ Default Parameters
function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

greet();  // Uses default parameter

// 31️⃣ map(), forEach(), filter() Difference
const completedTasks = tasks.filter(task => task.completed);
tasks.forEach((task, index) => console.log(task));
const taskNames = tasks.map(task => task.task);

// 32️⃣ Falsy vs Truthy values
const isValid = '' ? 'Truthy' : 'Falsy'; // "Falsy"

// 33️⃣ Optional Chaining (?.)
const taskDescription = tasks[0]?.task;

// 34️⃣ Nullish Coalescing (??)
const description = tasks[0]?.description ?? 'No description';

// 35️⃣ Memory Leaks
// (Using event listeners in a way that may cause memory leaks if not removed)

