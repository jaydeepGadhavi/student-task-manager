import React, { useState } from 'react';

function TaskList({ tasks, deleteTask, toggleTask, updateTask }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const handleEditClick = (task) => {
        setEditingId(task.id);
        setEditForm(task);
        setDeleteConfirmId(null); // Close delete confirm if open
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    const saveEdit = (id) => {
        if (!editForm.title.trim()) return; // Basic validation
        updateTask(id, editForm);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleDeleteClick = (id) => {
        setDeleteConfirmId(id);
        setEditingId(null); // Close edit if open
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
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`task-card ${task.completed ? "completed" : ""}`}
                    style={{ position: 'relative' }}
                >
                    {editingId === task.id ? (
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
                                    onClick={() => saveEdit(task.id)}
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
                                {deleteConfirmId === task.id ? (
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
                                            onClick={() => { deleteTask(task.id); setDeleteConfirmId(null); }}
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
                                            onClick={() => setDeleteConfirmId(null)}
                                        >
                                            No
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="btn-icon"
                                            style={{ background: 'var(--primary-color)' }}
                                            onClick={() => handleEditClick(task)}
                                            title="Edit Task"
                                            disabled={task.completed}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className="btn-icon"
                                            style={{ background: task.completed ? 'var(--text-muted)' : 'var(--success-color)' }}
                                            onClick={() => toggleTask(task.id)}
                                            title={task.completed ? "Mark Incomplete" : "Mark Complete"}
                                        >
                                            {task.completed ? "Undo" : "✔"}
                                        </button>
                                        <button
                                            className="btn-icon"
                                            style={{ background: 'var(--danger-color)' }}
                                            onClick={() => handleDeleteClick(task.id)}
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
