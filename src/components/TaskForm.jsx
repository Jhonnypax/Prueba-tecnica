import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ id: 0, title: '', completed: false });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTask(parseInt(id));
    }
  }, [id]);

  const fetchTask = (taskId) => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const foundTask = storedTasks.find(task => task.id === taskId);
    if (foundTask) {
      setTask(foundTask);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (id) {
      const updatedTasks = storedTasks.map(t => (t.id === parseInt(id) ? task : t));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      const newTask = { ...task, id: storedTasks.length + 1 }; 
      storedTasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  return (
    <div>
      <h2>{id ? 'Editar Tarea' : 'Crear nueva tarea'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Guardar tarea</button>
      </form>
    </div>
  );
};

export default TaskForm;
