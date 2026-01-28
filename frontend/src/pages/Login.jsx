import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        // Add your login logic here later
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