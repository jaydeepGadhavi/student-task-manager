import React from 'react';
import '../index.css'; // Ensure styles are available

function Navbar({ onLogout, openTaskModal }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>Task Manager</h1>
            </div>
            <div className="navbar-actions">
                {openTaskModal && (
                    <button className="btn-primary" onClick={openTaskModal}>
                        + Add Task
                    </button>
                )}
                <button className="btn-secondary" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
