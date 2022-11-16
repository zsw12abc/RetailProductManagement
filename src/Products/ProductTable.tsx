import Table from 'react-bootstrap/Table';
import ProductRow, {IProduct} from "./ProductRow";
import PaginationBar from "../SystemComponent/PaginationBar";
import React, {useState} from "react";
import Container from "react-bootstrap/Container";


function ProductTable(props: any) {
    const {productList, saveProductChanges, deleteProduct, productTypes} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = productList.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(productList.length / recordsPerPage)

    const [isEditMode, setEditMode] = useState<boolean[]>(Array(productList.length).fill(false));

    function UpdateEditItemStatus(id: number) {
        UpdateEditMode(id, true)
    }

    function SaveProductChanges(product: IProduct) {
        saveProductChanges(product);
        UpdateEditMode(product.id, false)
    }

    function CancelProductChanges(id: number) {
        UpdateEditMode(id, false)
    }

    function UpdateEditMode(id: number, isEdit: boolean) {
        setEditMode(prevState => {
            const prevStateCopy = {...prevState};
            prevStateCopy[id - 1] = isEdit;
            return prevStateCopy;
        });
    }

    function DeleteProduct(id: number) {
        console.log("DeleteProduct", id)
        deleteProduct(id);
    }

    return (
        <Container>
            <div className="justify-content-md-center">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>ProductType</th>
                        <th>Active</th>
                        <th>EditItem</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRecords.map((product: any) => (
                        <ProductRow product={product} productTypes={productTypes} key={product.id} isEditMode={isEditMode[product.id - 1]}
                                    updateEditItemStatus={UpdateEditItemStatus}
                                    saveProductChanges={SaveProductChanges} cancelProductChanges={CancelProductChanges}
                                    deleteProduct={DeleteProduct}
                        />
                    ))}
                    </tbody>
                </Table>
                <PaginationBar
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </Container>
    );
}

export default ProductTable;
