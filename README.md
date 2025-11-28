# Task Manager

A modern, feature-rich task management web application built with vanilla HTML, CSS, and JavaScript. This application helps you organize both one-time tasks and daily recurring tasks with an intuitive interface and persistent storage.

## Features

### Task Types
- **One-Off Tasks**: Regular tasks that are completed once and moved to the completed list
- **Daily Tasks**: Recurring tasks that appear every day. When completed, they move to the completed list while remaining available for the next day

### Task Management
- ✅ Add, complete, and delete tasks
- 📅 Automatic date tracking for daily tasks (shows current date)
- 📊 Daily task completion percentage tracker
- 🎨 Color-coded task items:
  - Light blue background for active tasks
  - Light green background for completed tasks
- 📝 Completion date display for finished tasks

### Filtering & Organization
- **Daily Tasks Tab**: View and manage your recurring daily tasks with progress tracking
- **All Tab**: View all one-off tasks (both active and completed)
- **Active Tab**: View only uncompleted one-off tasks
- **Completed Tab**: View only completed one-off tasks

### User Experience
- 💾 Persistent storage using browser localStorage (data survives page refreshes and browser restarts)
- ⌨️ Keyboard support (press Enter to add tasks)
- 📱 Responsive design that works on desktop and mobile devices
- 🎯 Modern UI with curved corners and smooth transitions
- 📈 Real-time progress bar for daily task completion

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installation required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

### File Structure
```
Task Manager/
├── index.html      # Main HTML structure
├── styles.css      # Styling and layout
├── script.js       # Application logic and functionality
└── README.md       # This file
```

## How to Use

### Adding Tasks
1. **One-Off Task**: Type your task in the input field and click "Add One-Off Task" or press Enter
2. **Daily Task**: Type your task in the input field and click "Add Daily Task"

### Managing Tasks
- **Complete a Task**: Click the checkbox next to any task
- **Delete a Task**: Click the "Delete" button on any task
- **Filter Tasks**: Click on the filter tabs (Daily Tasks, All, Active, Completed) to view different task categories

### Daily Tasks
- Daily tasks show the current date in parentheses (e.g., "Write 500 words (12/15/2023)")
- When you complete a daily task, it moves to the Completed tab with today's completion date
- The progress bar shows what percentage of your daily tasks have been completed today
- Daily tasks remain in the Daily Tasks tab for future completion

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, transitions, and responsive design
- **JavaScript (ES6+)**: Vanilla JavaScript for all functionality
- **localStorage API**: Browser-based data persistence

### Data Storage
- Tasks are stored in browser localStorage
- Two separate storage keys:
  - `oneTimeTasks`: Stores one-off tasks
  - `dailyTasks`: Stores recurring daily tasks
- Data persists across browser sessions

### Key Features Implementation
- **Task Separation**: Daily and one-off tasks are stored in separate arrays to ensure they never mix
- **Progress Tracking**: Calculates completion percentage based on daily tasks completed today
- **Date Management**: Automatically tracks completion dates and displays current date for daily tasks
- **State Management**: Maintains current filter state when performing operations

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with localStorage support

## Future Enhancements
Potential features for future versions:
- Task editing functionality
- Task categories or tags
- Due dates for one-off tasks
- Task search functionality
- Export/import tasks
- Dark mode theme

## License
This project is open source and available for personal and commercial use.

## Contributing
Feel free to fork this project and submit pull requests for any improvements!

---

**Enjoy managing your tasks!** 🎉

