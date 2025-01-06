document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('input');
    const addBtn = document.getElementById('btn');
    const taskList = document.querySelector('.task-list');
    const form = document.querySelector('.controls-container');
    const filters = document.querySelector('.filters');
    const tasks = document.querySelector('.task');

    addBtn.addEventListener('click', (addTask) => {
        const taskText = textInput.value.trim();
        if (taskText) {
            console.log(taskText);
            textInput.value = '';
        } else {
            alert('Please enter a valid task!');
        }

        // Create an Element with the Inputed Task
        const taskElement = document.createElement('li');
        taskElement.textContent = taskText;
        taskElement.classList.add('task');
        taskList.appendChild(taskElement);

        const taskBtnContainer = document.createElement('div');
        taskElement.appendChild(taskBtnContainer);
        taskBtnContainer.classList.add('task-button-container');

        const editButton = document.createElement('a');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');

        const deleteButton = document.createElement('a');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn');

        taskBtnContainer.appendChild(editButton);
        taskBtnContainer.appendChild(deleteButton);
    
        editButton.addEventListener('click', () => {
            const updatedText = prompt('Edit your task:', taskElement.firstChild.textContent);
            if (updatedText !== null) {
                taskElement.childNodes[1].textContent = updatedText.trim(); // Update the task if input is valid
            }
        });
        
        deleteButton.addEventListener('click', () => {
            taskElement.remove(); // Remove the task element from the list
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('complete-task');
        taskElement.insertBefore(checkbox, taskElement.firstChild); // Add it to the start of the task

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskElement.classList.add('completed'); // Add a CSS class of completed to the task
            } else {
                taskElement.classList.remove('completed'); // Remove the class of completed
            }
        });

        filters.classList.remove('hidden');

        const filterTasks = (filter) => {
            const tasks = document.querySelectorAll('.task'); // Get all tasks

            tasks.forEach(task => {
                if (filter === "all") {
                    task.style.display = "flex"; // Show all tasks
                } else if (filter === "completed") {
                    task.style.display = task.classList.contains('completed') ? "flex" : "none";
                } else if (filter === "pending") {
                    task.style.display = !task.classList.contains('completed') ? "flex" : "none";
                }
            });
        };

        document.querySelector('.all').addEventListener('click', () => filterTasks("all"));
        document.querySelector('.complete').addEventListener('click', () => filterTasks("completed"));
        document.querySelector('.pending').addEventListener('click', () => filterTasks("pending"));
        
        // // Added form submission prevention
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     addTask();
        // });
    });

});

let tasks = [];

// Save tasks to local storage
const saveTaskToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    }
};

// Render a task
const renderTask = (task) => {
    const taskList = document.getElementById('task-list');
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.dataset.id = task.id;
    
    taskElement.innerHTML = `
        <input type="checkbox" class="complete-task" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    if (task.completed) taskElement.classList.add('completed');
    taskList.appendChild(taskElement);
};

// Add task
addBtn.addEventListener('click', () => {
    const taskText = textInput.value.trim();

    if (taskText) {
        const newTask = { id: Date.now(), text, completed: false };
        tasks.push(newTask);
        renderTask(newTask);
        saveTaskToLocalStorage();
        textInput.value = ''; // Clear input field
    }
})

// Initialize
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);