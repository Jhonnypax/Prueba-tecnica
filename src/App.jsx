import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./index.css"

const App = () => {
  return (
      <div>
        <header className="header">
          <h1>MANEJO DE TAREAS</h1>
        </header>
        <nav className="nav">
            <Link to="/">LISTA DE TAREAS</Link>
            <button><Link to="/new">NUEVA TAREA</Link></button>
          </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/new" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
