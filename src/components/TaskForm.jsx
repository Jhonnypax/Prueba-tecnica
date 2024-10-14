import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import "../index.css"

const TaskForm = () => {
  const [task, setTask] = useState({ id: 0, title: '', completed: false });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTask(parseInt(id));
    }
  }, [id]);

  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error cargando tarea:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, task);
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/todos', task);
      }
      navigate('/');
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  return (
    <div>
      <h2>{id ? 'Editar tarea' : 'Crear nueva tarea'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Titulo:</label>
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

TaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
};

export default TaskForm;