import Dropdown from 'react-bootstrap/Dropdown';
import {useState} from "react";

function ProductTypesDropdown(props: any) {
    const {currentType, updateProductType, productTypes} = props;
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
                {productTypes.map((product:any) => (
                    <Dropdown.Item key={product.productTypeId} active={currentType === product.productTypeName}
                                   onClick={() => UpdateProductType(product.productTypeName)}>{product.productTypeName}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ProductTypesDropdown;
