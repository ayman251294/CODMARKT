// Import necessary modules from 'React-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast notifications
toast.configure();

// Define the reducer function for the shopping cart
export const CartReducer = (state, action) => {

    // Destructure the state to access shoppingCart, totalPrice, and totalQty
    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    // Switch statement to handle different action types
    switch (action.type) {

        case 'ADD_TO_CART':

            // Check if the product is already in the cart
            const check = shoppingCart.find(product => product.ProductID === action.id);
            if (check) {
                // Show a toast notification if the product is already in the cart
                toast.info('this product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                // Return the original state if the product is already in the cart
                return state;
            }
            else {
                // Add the product to the cart if it's not already there
                product = action.product;
                product['qty'] = 1;
                product['TotalProductPrice'] = product.ProductPrice * product.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + product.ProductPrice;
                return {
                    shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            
        // Increment the quantity of a product in the cart
        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.TotalProductPrice = product.qty * product.ProductPrice;
            updatedQty = totalQty + 1;
            updatedPrice = totalPrice + product.ProductPrice;
            index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
            shoppingCart[index] = product;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            
        // Decrement the quantity of a product in the cart
        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.TotalProductPrice = product.qty * product.ProductPrice;
                updatedPrice = totalPrice - product.ProductPrice;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.ProductID === action.id);
                shoppingCart[index] = product;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            else {
                // Return the original state if the quantity is already 1
                return state;
            }
            
        // Delete a product from the cart
        case 'DELETE':
            const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = totalQty - product.qty;
            updatedPrice = totalPrice - product.qty * product.ProductPrice;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }
            
        // Empty the cart
        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            }

        // Default case: return the original state if the action type is not recognized
        default:
            return state;

    }

}
