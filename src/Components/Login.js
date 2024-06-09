// Importing necessary libraries and components
import React, { useState } from 'react';
import { auth } from '../Config/Config'; // Importing auth from Config
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import '../Login.css'; // Importing CSS for this component
import logo from '../images/ecommerceland.png' // Importing logo image

// Login component
export const Login = (props) => {

    // Defining state variables for email, password and error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Function to handle login
    const login = (e) => {
        e.preventDefault(); // Preventing default form submission
        // Signing in with email and password
        auth.signInWithEmailAndPassword(email, password).then(() => {
            // If successful, clear the form and redirect to home page
            setEmail('');
            setPassword('');
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message)); // If there's an error, set the error state
    }

    // Rendering the Login component
    return (
        <div className='login-container'>
            <div className='login-form'>
                <img className='logo' src={logo} alt="Logo" />
                <h2>Sign in</h2>
                <form autoComplete="off" onSubmit={login}>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className='remember-me'>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember password</label>
                    </div>
                    <button type="submit" className='login-btn'>LOGIN</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
                <span>Don't have an account? Register
                    <Link to="signup"> Here</Link>
                </span>
            </div>
        </div>
    );
};
