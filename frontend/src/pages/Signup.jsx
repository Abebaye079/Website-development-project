import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Added this
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // 1. Check if passwords match BEFORE calling the server
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                // Shows "User already exists" or other backend errors
                alert(data.error || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Connection error. Is your backend running?");
        }
    };

    return (
        <main className="auth-page-wrapper">
            <div className="auth-card">
                <h2 className="modal-title-green">Join Lissan School</h2>
                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {/* Added Confirm Password Input */}
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login" className="auth-link">Log In</Link>
                </p>
            </div>
        </main>
    );
}

export default Signup;