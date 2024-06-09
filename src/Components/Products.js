// Importing necessary libraries and components
import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext' // Importing ProductsContext
import { CartContext } from '../Global/CartContext' // Importing CartContext
import imageUrl from '../images/slide.jpg' // Importing image

// Products component
export const Products = () => {

    // Using the ProductsContext to get the products
    const { products } = useContext(ProductsContext);

    // Using the CartContext to get the dispatch function
    const { dispatch } = useContext(CartContext);

    // Rendering the Products component
    return (
        <>
            {products.length !== 0 && <img className='slideer' src={imageUrl} alt="Product" />}
            {products.length !== 0 && <h1>Products</h1>}

            <div className='products-container'>
                {products.length === 0 && <div>No products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            {product.ProductPrice}.00 MAD
                    </div>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                    </div>
                ))}
            </div>
        </>
    )
}
