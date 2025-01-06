document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('input');
    const addBtn = document.getElementById('btn');
    const taskList = document.querySelector('.task-list');
    const form = document.querySelector('.controls-container');
    const filters = document.querySelector('.filters');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Save tasks to local storage
    const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function renderTask(taskText, completed = false) {
        // Create an Element with the Inputed Task
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        
        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('complete-task');
        taskElement.insertBefore(checkbox, taskElement.firstChild); // Add it to the start of the task
        checkbox.checked = completed;
        
        // Create a span element for the text in the li
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;
        
        // Create a div for flexing the buttons
        const taskBtnContainer = document.createElement('div');
        taskBtnContainer.classList.add('task-button-container');
        
        // Create the edit button
        const editButton = document.createElement('a');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn');
        
        // Create the delete button
        const deleteButton = document.createElement('a');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn');
        
        // Append the buttons to the button div
        taskBtnContainer.appendChild(editButton);
        taskBtnContainer.appendChild(deleteButton);
        
        // Append the checkbox, button div and span to the li
        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskTextSpan);
        taskElement.appendChild(taskBtnContainer);
    
        if (completed) taskElement.classList.add('completed');
        
        // Append the list element to the ul (task list)
        taskList.appendChild(taskElement);
    
        editButton.addEventListener('click', () => {
            const updatedText = prompt('Edit your task:', taskTextSpan.textContent);
            if (updatedText?.trim()) {
                taskTextSpan.textContent = updatedText.trim(); // Update the task if input is valid
                const index = tasks.findIndex(t => t.text === taskText);
                if (index !== -1) {
                    tasks[index].text = updatedText.trim();
                    saveToLocalStorage();
                }
            }
        });
        
        deleteButton.addEventListener('click', () => {
            taskElement.remove(); // Remove the task element from the list
            tasks = tasks.filter(t => t.text !== taskText);
            saveToLocalStorage();
        });
    
        checkbox.addEventListener('change', () => {
            taskElement.classList.toggle('completed');
            const index = tasks.findIndex(t => t.text === taskText);
            if (index !== -1) {
                tasks[index].completed = checkbox.checked;
                saveToLocalStorage();
            }
        })
    }
    
    // Load saved tasks
    tasks.forEach(task => renderTask(task.text, task.completed));
    if (tasks.length > 0) filters.classList.remove('hidden');

    // Add a form submission prevention
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = textInput.value.trim();

        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveToLocalStorage();
            renderTask(taskText);
            textInput.value = '';
            filters.classList.remove('hidden');
        }
    })

    // Filter functionality
    const filterTasks = (filter) => {
        document.querySelectorAll('.task').forEach(task => { // Get all tasks
            task.style.display = (filter === "all" ||
                (filter === "completed" && task.classList.contains('completed')) ||
                (filter === "pending" && !task.classList.contains('completed'))) ? "flex" : "none";
        })
    };

    document.querySelector('.all').addEventListener('click', () => filterTasks("all"));
    document.querySelector('.complete').addEventListener('click', () => filterTasks("completed"));
    document.querySelector('.pending').addEventListener('click', () => filterTasks("pending"));
});