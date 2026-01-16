import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, toggleTask, updateTask }) {
    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [deleteConfirmIndex, setDeleteConfirmIndex] = useState(null);

    const handleEditClick = (index, task) => {
        setEditingIndex(index);
        setEditForm(task);
        setDeleteConfirmIndex(null); // Close delete confirm if open
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const saveEdit = (index) => {
        if (!editForm.title.trim()) return; // Basic validation
        updateTask(index, editForm);
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditForm({});
    };

    const handleDeleteClick = (index) => {
        setDeleteConfirmIndex(index);
        setEditingIndex(null); // Close edit if open
    };

    if (!tasks || tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>
                <p>No tasks available. Add a task to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-grid">
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={`task-card ${task.completed ? "completed" : ""}`}
                    style={{ position: 'relative' }}
                >
                    {editingIndex === index ? (
                        <div className="edit-mode">
                            <input
                                name="title"
                                value={editForm.title}
                                onChange={handleEditChange}
                                placeholder="Task Title"
                                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                            />
                            <textarea
                                name="description"
                                value={editForm.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                rows="2"
                                style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
                            />
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={editForm.dueDate}
                                    onChange={handleEditChange}
                                    style={{ flex: 1, padding: '5px' }}
                                />
                                <select
                                    name="priority"
                                    value={editForm.priority}
                                    onChange={handleEditChange}
                                    style={{ flex: 1, padding: '5px' }}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="task-actions">
                                <button
                                    style={{
                                        background: 'var(--success-color)',
                                        color: '#fff',
                                        padding: '5px 15px',
                                        fontSize: '14px',
                                        borderRadius: '0',
                                        marginRight: '5px'
                                    }}
                                    onClick={() => saveEdit(index)}
                                >
                                    Save
                                </button>
                                <button
                                    style={{
                                        background: 'var(--text-muted)',
                                        color: '#fff',
                                        padding: '5px 15px',
                                        fontSize: '14px',
                                        borderRadius: '0'
                                    }}
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3>{task.title}</h3>
                            {task.description && <p>{task.description}</p>}

                            <div className="task-meta">
                                <span>Due: {task.dueDate || 'No Date'}</span>
                                <span className={`priority-badge priority-${task.priority?.toLowerCase() || 'medium'}`}>
                                    {task.priority || 'Medium'}
                                </span>
                            </div>

                            <div className="task-actions">
                                {deleteConfirmIndex === index ? (
                                    <>
                                        <span style={{ fontSize: '12px', marginRight: '5px', color: 'var(--danger-color)' }}>Sure?</span>
                                        <button
                                            style={{
                                                background: 'var(--danger-color)',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                                borderRadius: '0',
                                                marginRight: '5px'
                                            }}
                                            onClick={() => { deleteTask(index); setDeleteConfirmIndex(null); }}
                                        >
                                            Yes
                                        </button>
                                        <button
                                            style={{
                                                background: 'var(--text-muted)',
                                                color: '#fff',
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                                borderRadius: '0'
                                            }}
                                            onClick={() => setDeleteConfirmIndex(null)}
                                        >
                                            No
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn-icon"
                                            style={{ background: 'var(--primary-color)' }}
                                            onClick={() => handleEditClick(index, task)}
                                            title="Edit Task"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon"
                                            style={{ background: task.completed ? 'var(--text-muted)' : 'var(--success-color)' }}
                                            onClick={() => toggleTask(index)}
                                            title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                                        >
                                            {task.completed ? "Undo" : "✔"}
                                        </button>
                                        <button
                                            className="btn-icon"
                                            style={{ background: 'var(--danger-color)' }}
                                            onClick={() => handleDeleteClick(index)}
                                            title="Delete Task"
                                        >
                                            🗑
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;
