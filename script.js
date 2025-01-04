document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('input');
    const addBtn = document.getElementById('btn');
    const taskList = document.querySelector('.task-list');
    const form = document.querySelector('.controls-container');

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
    });

    // Added form submission prevention
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });
});