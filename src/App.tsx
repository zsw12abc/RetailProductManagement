import React, {useEffect, useState} from 'react';
import './App.css';
import RetailNavBar from "./SystemComponent/RetailNavbar";
import ProductTable from "./Products/ProductTable";
import {IProduct} from "./Products/ProductRow";
import {Redirect, Route, Switch} from "react-router-dom";
import ProductDetails from "./Products/ProductDetails";
import axios from "axios";


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
    const [fetchProductList, setProductList] = useState([]);
    const [fetchProductTypeList, setProductTypeList] = useState([]);
    const headers = {'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'};
    const fetchProductListFromDb = () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            fetch('https://localhost:7260/api/Product', requestOptions).then(response => {
                return response.json();
            }).then(data => {
                setProductList(data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    const fetchProductTypeListFromDb = () => {
        try {
            axios.get('https://localhost:7260/api/ProductType', {headers}).then(response => {
                setProductTypeList(response.data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProductTypeListFromDb();
        fetchProductListFromDb();
    }, [])


    function SaveProductChangesViaAPI(product: IProduct) {
        try {
            axios.put('https://localhost:7260/api/Product', JSON.stringify(product), {headers}).then(r => {
                fetchProductListFromDb()
            })
        } catch (e) {
            console.log(e)
        }

    }

    function DeleteProductChangesViaAPI(id: number) {
        try {
            axios.delete('https://localhost:7260/api/Product?id=' + id, {headers}).then(r => {
                fetchProductListFromDb()
            })
        } catch (e) {
            console.log(e)
        }
    }

    //#region "LocalData"
    const productList = [
        {id: 1, name: 'Product 1', price: 100, productType: productTypes.Books, active: true},
        {id: 2, name: 'Product 2', price: 200, productType: productTypes.Toys, active: false},
        {id: 3, name: 'Product 3', price: 200, productType: productTypes.Food, active: true},
        {id: 4, name: 'Product 4', price: 200, productType: productTypes.Electronics, active: true},
        {id: 5, name: 'Product 5', price: 200, productType: productTypes.Toys, active: true},
        {id: 6, name: 'Product 6', price: 200, productType: productTypes.Food, active: false},
        {id: 7, name: 'Product 7', price: 200, productType: productTypes.Books, active: true},
        {id: 8, name: 'Product 8', price: 200, productType: productTypes.Toys, active: false},
        {id: 9, name: 'Product 9', price: 200, productType: productTypes.Food, active: true},
        {id: 10, name: 'Product 10', price: 200, productType: productTypes.Electronics, active: true},
        {id: 11, name: 'Product 11', price: 100, productType: productTypes.Books, active: true},
        {id: 12, name: 'Product 12', price: 200, productType: productTypes.Toys, active: false},
        {id: 13, name: 'Product 13', price: 200, productType: productTypes.Food, active: true},
        {id: 14, name: 'Product 14', price: 200, productType: productTypes.Electronics, active: true},
        {id: 15, name: 'Product 15', price: 200, productType: productTypes.Toys, active: true},
        {id: 16, name: 'Product 16', price: 200, productType: productTypes.Food, active: false},
        {id: 17, name: 'Product 17', price: 200, productType: productTypes.Books, active: true},
        {id: 18, name: 'Product 18', price: 200, productType: productTypes.Toys, active: false},
        {id: 19, name: 'Product 19', price: 200, productType: productTypes.Food, active: true},
        {id: 20, name: 'Product 20', price: 200, productType: productTypes.Electronics, active: true},
    ]

    const [products, setProducts] = useState(productList)

    function SaveProductChanges(product: IProduct) {
        setProducts(prevList => {
            const prevListCopy = [...prevList]
            const prevProduct = prevListCopy.find(p => p.id === product.id);
            if (prevProduct !== undefined) {
                prevProduct.name = product.name;
                prevProduct.price = product.price;
                prevProduct.productType = product.productType;
                prevProduct.active = product.active;
            } else {
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

    // console.log(fetchProductList, fetchProductTypeList)
    //#endregion "LocalData"

    return (
        <div>
            <RetailNavBar/>
            <Switch>
                <Route path={'/'} exact>
                    <Redirect to={'/Home'}/>
                </Route>
                <Route path={"/Product/New"}>
                    <ProductDetails products={fetchProductList} productTypes={fetchProductTypeList} saveProductChanges={SaveProductChangesViaAPI}
                                    deleteProduct={DeleteProductChangesViaAPI}/>
                </Route>
                <Route path={"/Product/:productId"}
                       children={<ProductDetails products={fetchProductList} productTypes={fetchProductTypeList}
                                                 saveProductChanges={SaveProductChangesViaAPI}
                                                 deleteProduct={DeleteProductChangesViaAPI}/>}/>
                <Route path="/Home">
                    <ProductTable productList={fetchProductList} productTypes={fetchProductTypeList} saveProductChanges={SaveProductChangesViaAPI}
                                  deleteProduct={DeleteProductChangesViaAPI}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
