import React from 'react';
import './App.css';
import RetailNavBar from "./SystemComponent/RetailNavbar";
import ProductTable from "./Products/ProductTable";

export const productTypes = {
    Books: 'Books',
    Electronics: 'Electronics',
    Food: 'Food',
    Furniture: 'Furniture',
    Toys: 'Toys',
}


function App() {
    const productList = [
        {id: 1, name: 'Product 1', price: 100, type: productTypes.Books, active: true},
        {id: 2, name: 'Product 2', price: 200, type: productTypes.Toys, active: false},
        {id: 3, name: 'Product 3', price: 200, type: productTypes.Food, active: true},
        {id: 4, name: 'Product 4', price: 200, type: productTypes.Electronics, active: true},
        {id: 5, name: 'Product 5', price: 200, type: productTypes.Toys, active: true},
        {id: 6, name: 'Product 6', price: 200, type: productTypes.Food, active: false},
        {id: 7, name: 'Product 7', price: 200, type: productTypes.Books, active: true},
        {id: 8, name: 'Product 8', price: 200, type: productTypes.Toys, active: false},
        {id: 9, name: 'Product 9', price: 200, type: productTypes.Food, active: true},
        {id: 10, name: 'Product 10', price: 200, type: productTypes.Electronics, active: true},
        {id: 11, name: 'Product 11', price: 100, type: productTypes.Books, active: true},
        {id: 12, name: 'Product 12', price: 200, type: productTypes.Toys, active: false},
        {id: 13, name: 'Product 13', price: 200, type: productTypes.Food, active: true},
        {id: 14, name: 'Product 14', price: 200, type: productTypes.Electronics, active: true},
        {id: 15, name: 'Product 15', price: 200, type: productTypes.Toys, active: true},
        {id: 16, name: 'Product 16', price: 200, type: productTypes.Food, active: false},
        {id: 17, name: 'Product 17', price: 200, type: productTypes.Books, active: true},
        {id: 18, name: 'Product 18', price: 200, type: productTypes.Toys, active: false},
        {id: 19, name: 'Product 19', price: 200, type: productTypes.Food, active: true},
        {id: 20, name: 'Product 20', price: 200, type: productTypes.Electronics, active: true},
    ]

    return (
        <div>
            <RetailNavBar/>
            <ProductTable productList={productList}/>
        </div>
    );
}

export default App;
