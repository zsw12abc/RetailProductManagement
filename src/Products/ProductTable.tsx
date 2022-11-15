import Table from 'react-bootstrap/Table';
import ProductRow from "./ProductRow";
import PaginationBar from "../SystemComponent/PaginationBar";
import React, {useState} from "react";



function ProductTable(props: any) {
    const {productList} = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = productList.slice(indexOfFirstRecord,indexOfLastRecord);
    const nPages = Math.ceil(productList.length / recordsPerPage)

    return (
        <div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {currentRecords.map((product: any) => (
                    <ProductRow product={product} key={product.id}/>
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
