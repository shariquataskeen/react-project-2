import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false, isRemoving: false }]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isRemoving: true } : task)));
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
    }, 500); // Match the animation duration
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li
            key={task.id}
            className={`${task.completed ? 'completed' : ''} ${task.isRemoving ? 'slide-out' : ''}`}
          >
            <span onClick={() => toggleTask(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
