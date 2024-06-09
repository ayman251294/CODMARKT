// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { storage, db } from '../Config/Config';
import { Navbar } from './Navbar';
import { useHistory } from 'react-router-dom';
import { auth } from '../Config/Config';
import '../AddProducts.css'; // Import the CSS file

// Define the AddProducts component
export const AddProducts = ({ user }) => {
    // Use the useHistory hook for navigation
    const history = useHistory();

    // Define state variables for product name, price, image, and error message
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    // Define the acceptable image types
    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    // Define the function to handle product image selection
    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        // Check if the selected file is an image and of the correct type
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            // If not, set the product image to null and display an error message
            setProductImg(null);
            setError('Please select a valid image type (jpg or jpeg or png)');
        }
    };

    // Define the function to add a product
    const addProduct = (e) => {
        e.preventDefault();
        // Create a reference to the storage service, and upload the product image
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Calculate and log the upload progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (err) => setError(err.message), // Handle upload errors
            () => {
                // Once the upload is complete, get the download URL and add the product to the database
                storage.ref('product-images').child(productImg.name).getDownloadURL().then((url) => {
                    db.collection('Products')
                        .add({
                            ProductName: productName,
                            ProductPrice: Number(productPrice),
                            ProductImg: url,
                        })
                        .then(() => {
                            // Reset the form fields and error message
                            setProductName('');
                            setProductPrice(0);
                            setProductImg('');
                            setError('');
                            document.getElementById('file').value = '';
                        })
                        .catch((err) => setError(err.message)); // Handle database errors
                });
            }
        );
    };

    useEffect(() => {
        // forcing user to signup
        auth.onAuthStateChanged((user) => {
            if (!user) {
                history.push('/login');
            }
        });
    }, [history]);

    return (
        <><Navbar user={user} />
        <div className="container">
            <h2>Add New Product</h2>
            <form autoComplete="off" onSubmit={addProduct} className="form-group">
                <label htmlFor="product-name">Product Name</label>
                <input
                    type="text"
                    className="form-control"
                    required
                    onChange={(e) => setProductName(e.target.value)} // Update the product name state when the input changes
                    value={productName} />
                <label htmlFor="product-price">Product Price</label>
                <input
                    type="number"
                    className="form-control"
                    required
                    onChange={(e) => setProductPrice(e.target.value)} // Update the product price state when the input changes
                    value={productPrice} />
                <label htmlFor="product-img">Product Image</label>
                <input
                // Update the product image state when a file is selected
                    type="file"
                    className="form-control"
                    id="file"
                    required
                    onChange={productImgHandler} />
                <button type="submit" className="btn btn-success btn-md mybtn">
                    Add Product
                </button>
            </form>
            {error && <span className="error-msg">{error}</span>}
        </div></>
    );
};
