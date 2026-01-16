import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
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
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (formData.name.length <= 3) {
            newErrors.name = "Minimum 3 characters required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter 10 digit number";
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
            // Save user data for login (doesn't log them in automatically yet)
            localStorage.setItem("user", JSON.stringify(formData));
            alert("Registration Successful");
            navigate("/login");
        }
    };

    return (
        <div className="page-center">
            <div className="auth-container">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

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
                            type="text"
                            name="phone"
                            placeholder="Mobile Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
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

                    <button type="submit" className="btn-primary">Register</button>
                </form>

                <p className="link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
