import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:3000/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async (newTask) => {
        const taskToAdd = { ...newTask, completed: false };
        try {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskToAdd),
            });
            const data = await response.json();
            setTasks([...tasks, data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            setTasks(tasks.map((task) => (task.id === id ? { ...updatedTask, id } : task)));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
            });
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleTask = async (id) => {
        const taskToToggle = tasks.find((t) => t.id === id);
        if (!taskToToggle) return;

        const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });
            setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("authData");
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
