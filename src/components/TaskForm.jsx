import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, updateTask, getTask } from '../services/api';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const task = await getTask(id);
        setTitle(task.title);
        setDescription(task.description);
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTask(id, { title, description });
    } else {
      await createTask({ title, description });
    }
    navigate('/tasks');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <button type="submit">{id ? 'Editar' : 'Crear'} Tarea</button>
    </form>
  );
}

export default TaskForm;
