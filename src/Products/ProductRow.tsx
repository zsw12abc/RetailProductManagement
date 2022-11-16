import Button from 'react-bootstrap/Button';
import {useState} from "react";
import ProductTypesDropdown from "./ProductTypesDropdown";
import ProductToggleButton from "./ProductToggleButton";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {Link} from "react-router-dom";

export interface IProductRow {
    product: IProduct
}

export interface IProduct {
    id: number,
    name: string,
    price: number,
    productType: string,
    active: boolean
}


function ProductRow(props: any) {
    const {product, isEditMode, updateEditItemStatus, saveProductChanges, cancelProductChanges, deleteProduct} = props
    const [item, setItem] = useState(product);
    const [name, setName] = useState<string>(item.name);
    const [price, setPrice] = useState<number>(item.price);
    const [productType, setProductType] = useState(item.productType);
    const [active, setActive] = useState<boolean>(item.active);
    const [showPopover, setShowPopover] = useState<boolean>(false);

    function EditProduct() {
        updateEditItemStatus(product.id);
    }

    function SaveProduct() {
        const productChanged: IProduct = {
            id: product.id,
            name: name,
            price: price,
            productType: productType,
            active: active,
        };
        setItem(productChanged)
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

    function UpdatePopover() {
        setShowPopover(!showPopover)
    }

    function DeleteItem() {
        setShowPopover(false)
        deleteProduct(product.id)
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Are u sure to delete {product.name}?</Popover.Header>
            <Popover.Body>
                <ButtonToolbar className="justify-content-between">
                    <Button variant={"danger"} onClick={DeleteItem}>Yes</Button>
                    <Button variant={"light"} onClick={() => setShowPopover(false)}>No</Button>
                </ButtonToolbar>
            </Popover.Body>
        </Popover>
    );

    return (
        <tr>
            <td><Link to={"/Product/"+product.id}>{product.id}</Link></td>
            <td hidden={isEditMode}>{product.name}</td>
            <td hidden={!isEditMode}><input type="text" value={name} onChange={e => UpdateName(e.target.value)}/></td>
            <td hidden={isEditMode}>{product.price}</td>
            <td hidden={!isEditMode}><input type="number" value={price} onChange={e => UpdatePrice(e.target.value)}/>
            </td>
            <td hidden={isEditMode}>{product.productType}</td>
            <td hidden={!isEditMode}><ProductTypesDropdown currentType={productType}
                                                           updateProductType={UpdateProductType}/></td>
            <td hidden={isEditMode}>{product.active ? '√' : 'X'}</td>
            <td hidden={!isEditMode}><ProductToggleButton currentActive={active} updateActive={UpdateActive}/></td>
            <td>
                <Button variant="primary" onClick={EditProduct} hidden={isEditMode}>Edit</Button>
                <OverlayTrigger trigger="click" placement="right" overlay={popover} show={showPopover}>
                    <Button variant="danger" hidden={isEditMode} onClick={UpdatePopover}>Delete</Button>
                </OverlayTrigger>
                <Button variant="danger" onClick={SaveProduct} hidden={!isEditMode}>Save</Button>
                <Button variant="light" onClick={CancelChanges} hidden={!isEditMode}>Cancel</Button>
            </td>
        </tr>
    )
}

export default ProductRow
