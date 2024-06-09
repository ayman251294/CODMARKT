// Import necessary modules from React and the custom CartReducer
import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'

// Create a new context for the shopping cart
export const CartContext = createContext();

// Define the provider component for the shopping cart context
export const CartContextProvider = (props) => {

    // Initialize the shopping cart state using the custom CartReducer
    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, totalQty: 0 })

    // Return the provider component with the shopping cart state and dispatch function
    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}