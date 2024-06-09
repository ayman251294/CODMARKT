// Importing necessary libraries and components
import React, { useEffect } from 'react'
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { Products } from './Products'
import { ContactInfo } from './ContactInfo';
import { useHistory } from 'react-router-dom' // Importing useHistory hook from react-router-dom
import { auth } from '../Config/Config' // Importing auth from Config

// Home component
export const Home = ({ user }) => {

    // Using the useHistory hook for redirecting users
    const history = useHistory();

    // useEffect hook to check if the user is authenticated
    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged(user => {
            if (!user) {
                // If user is not authenticated, redirect to login page
                history.push('/login');
            }
        })
    })

    // Rendering the Home component
    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products />
            <ContactInfo />
            <Footer />
        </div>
    )
}