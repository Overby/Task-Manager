// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const addDailyTaskButton = document.getElementById('addDailyTask');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');
const dailyProgress = document.getElementById('dailyProgress');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');

// Track current filter
let currentFilter = 'all';

// Task arrays to store tasks separately
let oneTimeTasks = JSON.parse(localStorage.getItem('oneTimeTasks')) || [];
let dailyTasks = JSON.parse(localStorage.getItem('dailyTasks')) || [];

// Add one-time task function
function addOneTimeTask(taskText) {
    if (taskText.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    oneTimeTasks.push(task);
    saveOneTimeTasks();
    renderTasks(currentFilter);
    taskInput.value = '';
}

// Add daily task function
function addDailyTask(taskText) {
    if (taskText.trim() === '') return;
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    dailyTasks.push(task);
    saveDailyTasks();
    renderTasks(currentFilter);
    updateDailyProgress();
    taskInput.value = '';
}

// Delete task function
function deleteTask(taskId, isDaily = false) {
    if (isDaily) {
        dailyTasks = dailyTasks.filter(task => task.id !== taskId);
        saveDailyTasks();
    } else {
        oneTimeTasks = oneTimeTasks.filter(task => task.id !== taskId);
        saveOneTimeTasks();
    }
    renderTasks(currentFilter);
    if (isDaily) updateDailyProgress();
}

// Calculate daily tasks completion percentage
function updateDailyProgress() {
    const totalDailyTasks = dailyTasks.length;
    if (totalDailyTasks === 0) {
        dailyProgress.style.display = 'none';
        return;
    }

    const completedToday = oneTimeTasks.filter(task => 
        task.completed && 
        new Date(task.completedAt).toDateString() === new Date().toDateString()
    ).length;

    // Ensure percentage doesn't exceed 100%
    const percentage = Math.min(Math.round((completedToday / totalDailyTasks) * 100), 100);
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
    dailyProgress.style.display = 'block';
}

// Toggle task completion
function toggleTask(taskId, isDaily = false) {
    if (isDaily) {
        dailyTasks = dailyTasks.map(task => {
            if (task.id === taskId) {
                if (!task.completed) {
                    // Move completed daily task to one-time tasks
                    const completedTask = {
                        ...task,
                        completed: true,
                        completedAt: new Date().toISOString()
                    };
                    oneTimeTasks.push(completedTask);
                    saveOneTimeTasks();
                    return null; // Remove from daily tasks
                }
            }
            return task;
        }).filter(Boolean); // Remove null entries
        saveDailyTasks();
    } else {
        oneTimeTasks = oneTimeTasks.map(task => {
            if (task.id === taskId) {
                return { 
                    ...task, 
                    completed: !task.completed,
                    completedAt: !task.completed ? new Date().toISOString() : null
                };
            }
            return task;
        });
        saveOneTimeTasks();
    }
    renderTasks(currentFilter);
    if (isDaily) updateDailyProgress();
}

// Save one-time tasks to localStorage
function saveOneTimeTasks() {
    localStorage.setItem('oneTimeTasks', JSON.stringify(oneTimeTasks));
}

// Save daily tasks to localStorage
function saveDailyTasks() {
    localStorage.setItem('dailyTasks', JSON.stringify(dailyTasks));
}

// Render tasks based on current filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    
    let filteredTasks = [];
    if (filter === 'active') {
        filteredTasks = oneTimeTasks.filter(task => !task.completed);
        dailyProgress.style.display = 'none';
    } else if (filter === 'completed') {
        filteredTasks = oneTimeTasks.filter(task => task.completed);
        dailyProgress.style.display = 'none';
    } else if (filter === 'daily') {
        filteredTasks = dailyTasks;
        updateDailyProgress();
    } else {
        filteredTasks = oneTimeTasks;
        dailyProgress.style.display = 'none';
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const completionDate = task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '';
        const today = new Date().toLocaleDateString();
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${filter === 'daily' ? `${task.text} (${today})` : task.text}</span>
            ${task.completed ? `<span class="completion-date">Completed: ${completionDate}</span>` : ''}
            <button class="delete-task">Delete</button>
        `;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id, filter === 'daily'));

        const deleteButton = li.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => deleteTask(task.id, filter === 'daily'));

        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskButton.addEventListener('click', () => addOneTimeTask(taskInput.value));
addDailyTaskButton.addEventListener('click', () => addDailyTask(taskInput.value));

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addOneTimeTask(taskInput.value);
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        renderTasks(currentFilter);
    });
});

// Initial render
renderTasks(currentFilter); 