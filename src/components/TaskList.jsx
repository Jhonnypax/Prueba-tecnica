import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../services/api.js";
import ConfirmModal from "../components/ConfirmModal";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleDelete = (taskId) => {
    setSelectedTask(taskId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    await deleteTask(selectedTask);
    setTasks(tasks.filter((task) => task.id !== selectedTask));
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <button onClick={() => navigate("/tasks/new")}>Crear Tarea</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
              Editar
            </button>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default TaskList;
