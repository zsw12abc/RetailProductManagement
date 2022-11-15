import Table from 'react-bootstrap/Table';
import ProductRow, {IProduct} from "./ProductRow";
import PaginationBar from "../SystemComponent/PaginationBar";
import React, {useState} from "react";
import Row from 'react-bootstrap/Row';


function ProductTable(props: any) {
    const {productList, saveProductChanges} = props;
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

    function UpdateEditMode(id: number, isEdit: boolean){
        setEditMode(prevState => {
            const prevStateCopy = {...prevState};
            prevStateCopy[id - 1] = isEdit;
            return prevStateCopy;
        });
    }

    return (
        <div>
            <Row></Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Active</th>
                    <th>EditItem</th>
                </tr>
                </thead>
                <tbody>
                {currentRecords.map((product: any) => (
                    <ProductRow product={product} key={product.id} isEditMode={isEditMode[product.id - 1]}
                                updateEditItemStatus={UpdateEditItemStatus}
                                saveProductChanges={SaveProductChanges} cancelProductChanges={CancelProductChanges}
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
    );
}

export default ProductTable;
