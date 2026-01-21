import { useState } from "react";

function TaskForm({ addTask, closeForm }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = "Task title is required";
        }
        if (!formData.dueDate) {
            newErrors.dueDate = "Due date is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addTask(formData);
            closeForm(); // Close modal after success
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{ marginBottom: '15px' }}>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        {errors.title && <span className="error-msg">{errors.title}</span>}
                    </div>

                    <div>
                        <textarea
                            name="description"
                            placeholder="Description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                            />
                            {errors.dueDate && <span className="error-msg">{errors.dueDate}</span>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="Low">Low Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="High">High Priority</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button type="submit" className="btn-primary" style={{ flex: 1 }}>Add Task</button>
                        <button type="button" className="btn-secondary" onClick={closeForm} style={{ flex: 1 }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
