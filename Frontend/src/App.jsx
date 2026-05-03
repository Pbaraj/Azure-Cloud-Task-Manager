import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("Could not connect to backend API.");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      await axios.post(`${API_URL}/tasks`, {
        title,
        description,
        completed: false,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError("Could not create task.");
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`${API_URL}/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed,
      });

      fetchTasks();
    } catch (err) {
      setError("Could not update task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <header>
          <p className="badge">Azure Cloud Project</p>
          <h1>Cloud Task Manager</h1>
          <p className="subtitle">
            React frontend connected to a FastAPI backend with a local database.
          </p>
        </header>

        <form className="task-form" onSubmit={createTask}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        {error && <p className="error">{error}</p>}

        <section className="task-list">
          {tasks.length === 0 ? (
            <p className="empty">No tasks yet. Add your first task above.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? "completed" : ""}`}
              >
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description || "No description provided."}</p>
                  <span>{task.completed ? "Completed" : "In progress"}</span>
                </div>

                <div className="actions">
                  <button onClick={() => toggleTask(task)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button className="delete" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default App;