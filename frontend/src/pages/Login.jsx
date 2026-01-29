import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to change pages

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // 1. Connect React to your Node.js Login API
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // 2. Store the logged-in user in localStorage
                // This lets other pages know who is logged in.
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login Successful!");
                
                // 3. Redirect to the Home or Profile page
                navigate("/"); 
            } else {
                // Show error if password/email is wrong
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <main className="auth-page-wrapper">
            <div className="auth-card">
                <h2 className="modal-title-green">Welcome Back</h2>
                <p>Login to your Lissan account</p>
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input 
                            type="email" 
                            id="login-email" 
                            placeholder="email@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <input 
                            type="password" 
                            id="login-password" 
                            placeholder="........" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                </form>

                <p className="auth-switch-text">
                    New to Lissan? <Link to="/signup" style={{color: '#007E3A', fontWeight: 'bold'}}>Create an account</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;