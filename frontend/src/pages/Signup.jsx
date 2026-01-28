import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signing up with:", formData);
        // Add your registration logic here
    };

    return (
        <main className="auth-page-wrapper">
            <div className="auth-card">
                <h2 className="modal-title-green">Join Lissan Language school</h2>
                <p>Start your language journey today</p>

                <form className="auth-form" id="signupForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name</label>
                        <input 
                            type="text" 
                            id="fullname" 
                            placeholder="Enter your full name" 
                            value={formData.fullname}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="email@example.com" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Create a password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            placeholder="Repeat your password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>

                <p className="auth-switch-text">
                    Already have an account? <Link to="/login" style={{color: '#007E3A', fontWeight: 'bold'}}>Login here</Link>
                </p>
            </div>
        </main>
    );
}

export default Signup;