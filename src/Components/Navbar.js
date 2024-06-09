// Importing necessary libraries and components
import React, { useContext } from 'react'
import logo from '../images/ecommerceland.png' // Importing logo image
import { Link } from 'react-router-dom' // Importing Link from react-router-dom for navigation
import { auth } from '../Config/Config' // Importing auth from Config
import { Icon } from 'react-icons-kit' // Importing Icon from react-icons-kit for icons
import { cart } from 'react-icons-kit/entypo/cart' // Importing cart icon from react-icons-kit
import { useHistory } from 'react-router-dom' // Importing useHistory hook from react-router-dom
import { CartContext } from '../Global/CartContext' // Importing CartContext

// Navbar component
export const Navbar = ({ user }) => {

    // Using the useHistory hook for redirecting users
    const history = useHistory();

    // Using the CartContext to get the total quantity
    const { totalQty } = useContext(CartContext);

    // Function to handle logout
    const handleLogout = () => {
        // Signing out the user
        auth.signOut().then(() => {
            // If successful, redirect to login page
            history.push('/login');
        })
    }

    // Rendering the Navbar component
    return (
        <div className='navbox'>
            <div className='leftside'>
                <Link to="/addproducts">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            {!user && <div className='rightside'>
                <span><Link to="signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="login" className='navlink'>LOGIN</Link></span>
            </div>}
            {user && <div className='rightside'>
                <span><Link to="/" className='navlink'>{user}</Link></span>
                <span><Link to="cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}
