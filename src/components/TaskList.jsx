import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks); 
    } else {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const limitedTasks = response.data.slice(0, 10); 
        setTasks(limitedTasks);
        localStorage.setItem('tasks', JSON.stringify(limitedTasks)); 
      } catch (error) {
        console.error('Error cargando tareas:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteTaskId(id);
  };

  const confirmDelete = () => {
    if (deleteTaskId) {
      const updatedTasks = tasks.filter(task => task.id !== deleteTaskId);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      setDeleteTaskId(null);
    }
  };

  return (
    <div>
      <h2>Lista de tareas</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span>{task.title}</span>
            <div>
              <button onClick={() => handleEdit(task.id)} className="btn">Editar</button>
              <button onClick={() => handleDelete(task.id)} className="btn btn-eliminar">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {deleteTaskId && (
        <Modal
          title="Confirmar eliminar"
          message="¿Está seguro de que quiere eliminar?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTaskId(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
