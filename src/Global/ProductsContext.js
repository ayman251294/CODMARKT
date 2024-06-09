// Import necessary modules
import React, { createContext } from 'react'
import { db } from '../Config/Config'

// Create a context for products
export const ProductsContext = createContext();

// Provider component for managing products state
export class ProductsContextProvider extends React.Component {

    // Initialize state with an empty products array
    state = {
        products: []
    }

    // Fetch products data from Firestore when component mounts
    componentDidMount() {

        // Store a reference to the current products array
        const prevProducts = this.state.products;
        // Listen for real-time changes in the 'Products' collection
        db.collection('Products').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            // Iterate through each change in the snapshot
            changes.forEach(change => {
                if (change.type === 'added') {
                    // Add new product to the products array
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    })
                }
                // Update the state with the new products array
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
// Render the children components wrapped in the ProductsContext Provider
render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

