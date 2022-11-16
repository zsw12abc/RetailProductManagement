import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import {IProduct} from "./ProductRow";
import {productTypesList} from "../App";
import InputGroup from 'react-bootstrap/InputGroup';
import {useHistory, useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";


function ProductDetails(props: any) {
    const history = useHistory();
    const params = useParams<{ productId: string }>();
    const {products, saveProductChanges, deleteProduct} = props;
    const isNewMode = (Object.keys(params).length === 0)
    // @ts-ignore
    let product: IProduct = {id: 0, name: undefined, price: undefined, productType: undefined, active: undefined};
    if (!isNewMode) {
        product = products.find((p: IProduct) => p.id === +params.productId);
    }
    const [item, setItem] = useState(product);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);

    function handleSubmit(event: any) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const updateProduct = {
                id: item.id === 0 ? products.slice(-1)[0].id + 1 : item.id,
                name: form.elements.fromProductName.value,
                price: Number(form.elements.formProductPrice.value),
                productType: form.elements.formProductType.value,
                active: form.elements.formProductActive.checked
            }
            setItem(updateProduct)
            console.log('updateProduct', updateProduct)
            saveProductChanges(updateProduct);
            event.preventDefault();
            history.push("/Home")
        }
        setValidated(true);
    }

    function handleDelete() {
        setShow(false)
        deleteProduct(item.id)
        history.push("/Home")
    }

    return (
        <Container>
            <div className="justify-content-md-center">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="fromProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter Product Name"
                                      defaultValue={isNewMode ? undefined : item.name}/>
                        <Form.Control.Feedback type="invalid">Please input a Product Name</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control required type="number" aria-label="Amount (to the nearest dollar)"
                                          placeholder="Price"
                                          defaultValue={isNewMode ? undefined : item.price}/>
                        <Form.Control.Feedback type="invalid">Please input a valid Price</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProductType">
                        <Form.Label>Type</Form.Label>
                        <Form.Select aria-label="Default Product Type">
                            {productTypesList.map(type => (
                                <option value={type.name} key={type.name}
                                        selected={type.name === item.productType}
                                >{type.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formProductActive">
                        <Form.Check type="checkbox" label="Active" defaultChecked={isNewMode ? undefined : item.active}/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button variant="danger" onClick={handleShowModal} hidden={isNewMode}>Delete</Button>
                    </Form.Group>
                </Form>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Warning!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you really want to delete {item.name}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={handleClose}>Cancel</Button>
                        <Button variant="outline-danger" onClick={handleDelete}>Confirmed</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    )
}

export default ProductDetails
