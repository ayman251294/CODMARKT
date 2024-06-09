// Importing necessary libraries and components
import React, { useState } from 'react';
import { auth, db } from '../Config/Config'; // Importing auth and db from Config
import { Link, useHistory } from 'react-router-dom'; // Importing Link and useHistory from react-router-dom for navigation
import '../Signup.css'; // Importing CSS for this component
import logo from '../images/ecommerceland.png' // Importing logo image

// Signup component
export const Signup = () => {

    // Defining state variables for name, email, password and error
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Using the useHistory hook for redirecting users
    const history = useHistory();

    // Function to handle signup
    const signup = (e) => {
        e.preventDefault(); // Preventing default form submission
        // Creating a new user with email and password
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            // If successful, add the user's data to the database
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                // If successful, clear the form and redirect to login page
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                history.push('/login');
            }).catch(err => setError(err.message)); // If there's an error, set the error state
        }).catch(err => setError(err.message)); // If there's an error, set the error state
    }

    // Rendering the Signup component
    return (
        <div className='signup-container'>
            <form className='signup-form' onSubmit={signup}>
                <img className='logo' src={logo} alt="Logo" />
                <h2>Sign up</h2>
                {error && <span className='error-msg'>{error}</span>}
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required onChange={(e) => setName(e.target.value)} value={name} />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                
                <button type="submit" className='btn-submit'>SUBMIT</button>
                
                <span>Already have an account? Login <Link to="/login">Here</Link></span>
            </form>
        </div>
    )
}
