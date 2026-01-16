import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Minimum 6 characters required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === formData.email && user.password === formData.password) {
                localStorage.setItem("authData", JSON.stringify(user));
                navigate("/dashboard");
            } else {
                alert("Invalid Email or Password");
            }
        }
    };

    return (
        <div className="page-center">
            <div className="auth-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <span className="error-msg">{errors.password}</span>}
                    </div>

                    <button type="submit" className="btn-primary">Login</button>
                </form>

                <p className="link">
                    New user? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
