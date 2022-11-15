import Dropdown from 'react-bootstrap/Dropdown';
import {productTypesList} from "../App";
import {useState} from "react";

function ProductTypesDropdown(props: any) {
    const {currentType, updateProductType} = props;
    const [type, setType] = useState(currentType);

    function UpdateProductType(productName: any) {
        setType(productName)
        updateProductType(productName);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
                {type}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {productTypesList.map(product => (
                    <Dropdown.Item key={product.name} active={currentType === product.name}
                                   onClick={() => UpdateProductType(product.name)}>{product.name}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProductTypesDropdown;
