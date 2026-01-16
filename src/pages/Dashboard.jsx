import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
    const getLocalTasks = () => {
        let tasks = localStorage.getItem("tasks");
        if (tasks) {
            return JSON.parse(tasks);
        } else {
            return [];
        }
    };
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(getLocalTasks());
    const [isFormOpen, setIsFormOpen] = useState(false);
    useEffect(() => {
        // Mock data or fetch
        // fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")... 
        // For now, let's start empty or load from local storage if we wanted persistence
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, completed: false }]);
    };

    const updateTask = (index, updatedTask) => {
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleTask = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const logout = () => {
        // localStorage.clear()
        localStorage.removeItem("authData");
        localStorage.removeItem("tasks");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', paddingBottom: '50px' }}>
            <Navbar onLogout={logout} openTaskModal={() => setIsFormOpen(true)} />

            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>My Tasks</h2>
                </div>

                <TaskList
                    tasks={tasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    updateTask={updateTask}
                />
            </div>

            {isFormOpen && (
                <TaskForm
                    addTask={addTask}
                    closeForm={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;
