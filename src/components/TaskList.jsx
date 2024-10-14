import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './Modal';
import "../index.css"

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTasks(response.data.slice(0,10)); 
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteTaskId(id);
  };

  const confirmDelete = async () => {
    if (deleteTaskId) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${deleteTaskId}`);
        setTasks(tasks.filter(task => task.id !== deleteTaskId));
        setDeleteTaskId(null);
      } catch (error) {
        console.error('Error al borrar tarea:', error);
      }
    }
  };

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span>{task.title}</span>
            <div className='botones'>
              <button onClick={() => handleEdit(task.id)} className="btn">Editar</button>
              <button onClick={() => handleDelete(task.id)} className="btn btn-eliminar">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {deleteTaskId && (
        <Modal
          title="Confirmar eliminar"
          message="Esta seguro de que quiere eliminar esta tarea?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

export default TaskList;