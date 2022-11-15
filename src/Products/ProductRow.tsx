import Button from 'react-bootstrap/Button';
import {useState} from "react";
import ProductTypesDropdown from "./ProductTypesDropdown";
import ProductToggleButton from "./ProductToggleButton";


export interface IProductRow {
    product: IProduct
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    type: string,
    active: boolean
}


function ProductRow(props: any) {
    const {product, isEditMode, updateEditItemStatus, saveProductChanges, cancelProductChanges} = props
    const [item, setItem] = useState(product);
    const [name, setName] = useState<string>(item.name);
    const [price, setPrice] = useState<number>(item.price);
    const [productType, setProductType] = useState(item.type);
    const [active, setActive] = useState<boolean>(item.active);

    function EditProduct() {
        updateEditItemStatus(product.id);
    }

    function SaveProduct() {
        const productChanged: IProduct = {
            id: product.id,
            name: name,
            price: price,
            type: productType,
            active: active,
        };
        console.log(productChanged)
        saveProductChanges(productChanged);
    }

    function CancelChanges() {
        cancelProductChanges(product.id);
    }

    function UpdateName(name: any) {
        setName(name)
    }

    function UpdatePrice(price: string) {
        setPrice(+price)
    }

    function UpdateProductType(productType: any) {
        setProductType(productType)
    }

    function UpdateActive(isActive: boolean) {
        setActive(isActive)
    }

    return (
        <tr>
            <td>{product.id}</td>
            <td hidden={isEditMode}>{product.name}</td>
            <td hidden={!isEditMode}><input type="text" value={name} onChange={e => UpdateName(e.target.value)}/></td>
            <td hidden={isEditMode}>{product.price}</td>
            <td hidden={!isEditMode}><input type="number" value={price} onChange={e => UpdatePrice(e.target.value)}/>
            </td>
            <td hidden={isEditMode}>{product.type}</td>
            <td hidden={!isEditMode}><ProductTypesDropdown currentType={productType}
                                                           updateProductType={UpdateProductType}/></td>
            <td hidden={isEditMode}>{product.active ? '√' : 'X'}</td>
            <td hidden={!isEditMode}><ProductToggleButton currentActive={active} updateActive={UpdateActive}/></td>
            <td>
                <Button variant="primary" onClick={EditProduct} hidden={isEditMode}>Edit</Button>
                <Button variant="danger" onClick={SaveProduct} hidden={!isEditMode}>Save</Button>
                <Button variant="light" onClick={CancelChanges} hidden={!isEditMode}>Cancel</Button>
            </td>
        </tr>
    )
}

export default ProductRow
