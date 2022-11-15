import React, {useState} from 'react';
import './App.css';
import RetailNavBar from "./SystemComponent/RetailNavbar";
import ProductTable from "./Products/ProductTable";
import {IProduct} from "./Products/ProductRow";
import {Redirect, Route, Switch} from "react-router-dom";
import ProductDetails from "./Products/ProductDetails";


export const productTypes = {
    Books: 'Books',
    Electronics: 'Electronics',
    Food: 'Food',
    Furniture: 'Furniture',
    Toys: 'Toys',
}

export const productTypesList = [
    {name: "Please Select The Product Type"},
    {name: productTypes.Books},
    {name: productTypes.Electronics},
    {name: productTypes.Food},
    {name: productTypes.Furniture},
    {name: productTypes.Toys},
]


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

    const [products, setProducts] = useState(productList)

    function SaveProductChanges(product: IProduct) {
        setProducts(prevList => {
            const prevListCopy = [...prevList]
            const prevProduct = prevListCopy.find(p => p.id === product.id);
            if (prevProduct !== undefined) {
                console.log("updated")
                prevProduct.name = product.name;
                prevProduct.price = product.price;
                prevProduct.type = product.type;
                prevProduct.active = product.active;
            }else{
                console.log("added")
                prevListCopy.push(product)
            }
            console.log("Update List", prevListCopy)
            return prevListCopy;
        });
    }

    function DeleteProduct(id: number) {
        setProducts(prevList => {
            const prevListCopy = [...prevList]
            prevListCopy.forEach((item, index) => {
                if (item.id === id) {
                    console.log("Try to delete", item)
                    prevListCopy.splice(index, 1)
                }
            })
            console.log('Delete Completed', prevListCopy)
            return prevListCopy;
        });
    }

    return (
        <div>
            <RetailNavBar/>
            <Switch>
                <Route path={'/'} exact>
                    <Redirect to={'/Home'}/>
                </Route>
                <Route path={"/Product/New"}>
                    <ProductDetails products={products} saveProductChanges={SaveProductChanges}
                                    deleteProduct={DeleteProduct}/>
                </Route>
                <Route path={"/Product/:productId"}
                       children={<ProductDetails products={products} saveProductChanges={SaveProductChanges}
                                                 deleteProduct={DeleteProduct}/>}/>
                <Route path="/Home">
                    <ProductTable productList={products} saveProductChanges={SaveProductChanges}
                                  deleteProduct={DeleteProduct}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
